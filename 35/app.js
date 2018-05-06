const express = require('express');
const bodyParser = require('body-parser');

const Sequelize = require('sequelize');
const config = require('config');

const db = require('./db')(Sequelize, config);

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/tasks', async (req, res,) => {
	res.json(await db.Task.findAll());
});

app.post('/tasks', async (req, res,) => {
	let response = { error: null };

	if (Math.random() < 0.5) {
		response.error = 'adding error';
	} else {
		response.result = await db.Task.create(req.body.task);
	}

	setTimeout(() => res.json(response), 500);
});

(async function () {
	await db.sequelize.sync({ force: true });
	await db.Task.create({ text: 'Sleep', id: 1213, completed: false });
	await db.Task.create({ text: 'Eat', id: 1234, completed: false });
	await db.Task.create({ text: 'Code', id: 235324, completed: false });

	app.listen(config.app.port, () => console.log('Server running'));
})();
