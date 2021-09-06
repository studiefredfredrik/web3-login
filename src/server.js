let express = require('express');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');

let app = express();

app.use('/', express.static('./frontend'))

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/api/favorites', function (req, res) {
    res.send('test')
})

console.log('Servering on: http://localhost:8080')
app.listen(8070)