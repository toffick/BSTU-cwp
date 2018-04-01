const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const express = require('express');
const config = require('../config.json');
const sequelize = require('sequelize');
const db = require('../db/index')(sequelize);

const app = express();

(async () => {
	await db.sequelize.sync();

	app.use(cookieParser(config.appSso.cookie.key));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: false}));

	app.use(require('./sso')(db));

	app.listen(config.appSso.port, () => {
		console.log(`sso server listen port ${config.appSso.port}`);
	});
})();

