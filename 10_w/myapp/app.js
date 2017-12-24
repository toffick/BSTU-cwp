const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const saver = require('./lib/saver');

const validator = require('./routes/validator');
const index = require('./routes/films');

const app = express();


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use('/api/films', validator);
app.use('/api/films', index);

app.use(function (err, req, res, next){
    res.status(err.status || 500);
    res.end(err.message);
});

app.listen(3000);

