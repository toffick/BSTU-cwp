const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const Sequelize = require('Sequelize');
const db = require('./db/context')(Sequelize);

const api = require('./routes/index')(db);

const app = express();


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', api);

app.use(function (req, res, next){
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});


app.use(function (err, req, res, next){
    console.log(err);
    res.status(err.status || 500);
    res.end(err.message);
});

db.connection.sync({force: true}).then(async () =>{
    await require('./services/dbInsterter')(db.models);
    app.listen(3000, () =>{
        console.log('server listens on port 3000');
    });
});



module.exports = app;
