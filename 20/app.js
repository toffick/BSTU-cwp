const express = require('express');
const app = express();
const index = require('./routes/index')(app);
const path = require('path');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use('/', index);


app.use(function (req, res, next){
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next){
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
