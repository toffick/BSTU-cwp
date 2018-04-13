const express = require('express');
const bodyParser = require('body-parser');

const Sequelize = require('sequelize');
const config = require('config');

const db = require('./db')(Sequelize, config);

const app = express();

// Mounting
app.use(express.static('public'));
app.use(bodyParser.json());

(async function () {
	db.sequelize.sync({force: true});

	app.listen(config.app.port, () => console.log('Server running'));
})();
