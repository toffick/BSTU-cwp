const Sequelize = require('sequelize');
const config = require('./config');

const {models, connection} = require('./models')(Sequelize, config);
require('./insterter')(models, connection);

module.exports = {models};
