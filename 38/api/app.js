const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const Sequelize = require('sequelize');
const config = require('config');

const db = require('./db')(Sequelize, config);

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

let corsOptions = {
	origin: (origin, callback) => {
		callback(null, true);
	},
	credentials: true,
	methods: ["GET", "PUT", "POST", "OPTIONS", "DELETE"],
	headers: ["x-user", "X-Signature", "accept", "content-type"],
};

app.use(cors(corsOptions));
app.options("*", cors());

app.get('/points', async (req, res,) => {
	res.json(await db.Point.findAll());
});

app.get('/points/:id', async (req, res,) => {
	res.json(await db.Point.findById(+req.params.id));
});

app.post('/points', async (req, res) => {
	res.json(await db.Point.create(req.body))
});

app.put('/points/:id', async (req, res) => {
	await db.Point.update(req.body, { where: { id: +req.params.id }, limit: 1 });

	res.json(await db.Point.findById(+req.params.id));
});

app.delete('/points/:id', async (req, res) => {

	res.json(await db.Point.destroy({ where: { id: req.params.id } }));
});

app.use((req, res) => {
	res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});

(async function () {
	await db.sequelize.sync({ force: true });

	db.Point.create({name: 'Minsk', time: 60*60*10, vehicle: 'bike'});
	db.Point.create({name: 'Bobruisk', time: 60*20*10, vehicle: 'car'});
	db.Point.create({name: 'Golem', time: 60*15*10, vehicle: 'walk'});

	app.listen(config.app.port, () => console.log('Server running'));
})();
