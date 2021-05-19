// curl -d "username=gaurav&password=secret&website=eronkan.com" -X POST http://localhost:8800/data
var moment = require('moment')
var express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

var app = express();

app.get('/', function (req, res) {
    res.send('<b>My</b> first express http server');
});

app.use(bodyParser.urlencoded({ extended: true }));
// for json : use app.use(bodyParser.json({extended:true}))

app.post('/data', (req, res) => {
    
    console.log('Got body:', req.body);
    let temp = JSON.stringify(req.body) + '  ' + moment(Date.now()).format('YYYY-MM-DD HH:MM:SS') + ' \n' ;
    fs.appendFile('body.txt', temp , function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
    res.sendStatus(200);
});

app.use(function(req, res, next) {
    res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});

app.listen(8800, function () {
    console.log('Example app listening on port 8800.');
});
