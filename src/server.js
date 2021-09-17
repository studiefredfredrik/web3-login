let express = require('express');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let ethSigUtil = require('eth-sig-util');
let jwt = require('jsonwebtoken');

let app = express();

app.use('/', express.static('./frontend'))

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.post('/api/login', async function (req, res) {
    if(!req.body.signedMessage) return res.status(400).send('400')

    let recoveredAddress = ethSigUtil.recoverPersonalSignature({
        data: req.body.nonce,
        sig: req.body.signedMessage
    });

    let privateKey = fs.readFileSync('private.key');
    let jwt = jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256'});

    res.send({
        recoveredAddress: recoveredAddress,
        jwt: jwt
    })
})

console.log('Servering on: http://localhost:8070')
app.listen(8070)