'use strict';

var Http = require('http');
var Express = require('express');
var BodyParser = require('body-parser');
var Swaggerize = require('swaggerize-express');
var Path = require('path');
var db = require('./db')();

var App = Express();

var Server = Http.createServer(App);

db.sequelize.sync({force: true}).then(() => {
  App.use(BodyParser.json());
  App.use(BodyParser.urlencoded({
    extended: true
  }));

  App.use(Swaggerize({
    api: Path.resolve('./config/swagger.yaml'),
    handlers: Path.resolve('./handlers'),
  }));

  App.use((err, req, res, next)=>{
    res.status(err.status).json(err);
  });

  Server.listen(8000, function () {
    App.swagger.api.host = this.address().address + ':' + this.address().port;
    /* eslint-disable no-console */
    console.log('App running on %s:%d', this.address().address, this.address().port);
    /* eslint-disable no-console */
  });
});


