const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('../config.json');
const sequelize = require('sequelize');
const db = require('../db/index')(sequelize);
const {setTestData} = require('../helpers');

const app = express();
const auth = require('./auth')(db);

app.use(express.static('public'));
app.use(cookieParser(config.appService.cookie.key));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/resource', auth, (req, res) => {
	res.json(req.user);
});

app.use('/token', (req, res) => {
	const {token, source} = req.query;
	res.cookie("__service_token", token, {signed: true});
	res.redirect(source);
});

(async () => {
	await db.sequelize.sync({force: true});
	await setTestData(db);

	app.listen(config.appService.port, () => {
		console.log(`service server listen port ${config.appService.port}`);
	});
})();

