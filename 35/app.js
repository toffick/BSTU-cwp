const express = require('express');
const bodyParser = require('body-parser');

const Sequelize = require('sequelize');
const config = require('config');

const db = require('./db')(Sequelize, config);

const app = express();

app.get('/', async (req, res,) => {
	res.json(await db.Task.findAll());
});

app.post('/', async (req, res,) => {
	let response = { error: null };

	if (Math.random() < 0.5) {
		response.error = 'adding error';
		res.json(response);
		return;
	}

	response.result = await db.Task.create(req.body);
	res.json(response);
});

(async function () {
	await db.sequelize.sync({ force: true });

	app.use(express.static('public'));
	app.use(bodyParser.json());


	app.listen(config.app.port, () => console.log('Server running'));
})();
