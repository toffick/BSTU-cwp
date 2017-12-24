const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const api = require('./routes/index');

const app = express();

// view engine setup

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', api);

// catch 404 and forward to error handler
app.use(function (req, res, next){
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});


app.use(function (err, req, res, next){
    res.status(err.status || 500);
    res.end(err.message);
});

module.exports = app;
