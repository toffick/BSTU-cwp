const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const Sequelize = require('sequelize');

const app = express();
const db = require('./db')(Sequelize);
const repoController = require('./controllers/repo');

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));


(async () => {
	await db.sequelize.sync({force: false});

	app.use('/repo', repoController(db));
	app.listen(config.app.port, () => {
		console.log('server listen port 9000');
	});
})();
