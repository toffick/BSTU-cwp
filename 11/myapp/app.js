const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const api = require('./routes/api');

const app = express();
app.use('/images/actors',express.static(__dirname+'/public'));
app.use('/images/actors/*', (req, res, next) => {
    res.sendFile(__dirname+ '/public/no_photo.jpeg');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use('/api', api);

app.use(function (err, req, res, next){
    console.error(err);
    res.status(err.status || 500);
    res.end(err.message);
});

app.listen(3000);

