let express = require('express');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let ethSigUtil = require('eth-sig-util');
let jsonwebtoken = require('jsonwebtoken');

let port = 5000
let secretKey = 'SuperSecretJwtSigningKey6549819846516515'

let app = express();
app.use('/', express.static('./frontend/dist'))
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

let spentNonces = []
let users = {
    '0x3c4b61221ddadc54a071d564ee2da3dfe3111c36' : { name: 'Best user', roles: ['ADMIN', 'DEVELOPER'] }
}

app.post('/api/login', async function (req, res) {
    if(!req.body.signedMessage || !req.body.nonce) return res.status(400).send('400 - Invalid payload')

    // Getting signers address from signature + nonce
    let recoveredAddress = ethSigUtil.recoverPersonalSignature({
        data: req.body.nonce,
        sig: req.body.signedMessage
    });

    // We can check the integrity of the signed message for possible nefarious behaviour
    if(!req.body.nonce.includes(recoveredAddress)) return res.status(400).send('403 - Address in nonce does not match signing address')
    if(spentNonces.includes(req.body.nonce)) return res.status(400).send('403 - This is obviously a replay attack')
    spentNonces.push(req.body.nonce)

    // The user is now verified, we can now fetch the user's data from a database etc.
    let userData = users[recoveredAddress]

    // Creating JTW token
    let userObject = { address: recoveredAddress, userData: userData }
    let jwt = jsonwebtoken.sign(userObject, secretKey, { algorithm: 'HS256'});

    // Adding JWT token to cookie and sending result
    res.cookie('authcookie', jwt, { maxAge: 900000, httpOnly: true });
    res.send({
        recoveredAddress: recoveredAddress,
        jwt: jwt
    })
})

app.get('/api/auth-test', async function (req, res) {
    if(!req.cookies?.authcookie) return res.status(401).send('401 - Not authorized')

    jsonwebtoken.verify(req.cookies.authcookie, secretKey, function(error, decoded) {
        if(error) return res.status(401).send('401 - Not authorized, and you are most likely trying something nefarious')
        if(decoded?.address) return res.status(200).send(decoded)
        return res.status(500).send({response:`500 - error`})
    });
})

app.delete('/api/login', async function (req, res) {
    res.clearCookie("authcookie");
    res.status(201).send()
})

console.log(`Server running on port: ${port}`)
app.listen(port)