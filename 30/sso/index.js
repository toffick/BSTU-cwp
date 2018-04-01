const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const express = require('express');
const config = require('../config.json');
const sequelize = require('sequelize');
const db = require('../db/index')(sequelize);
const {verifyToken} = require('../helpers');
const path = require('path');
const {getRandomFromRange} = require('../helpers');
const jwt = require('jsonwebtoken');

const app = express();

const puplicFolder = './public';


(async () => {
	await db.sequelize.sync();

	app.use(cookieParser(config.appSso.cookie.key));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: false}));


	app.get('/login', async (req, res) => {

		//TODO сделать чтот-нибудь с этим
		let {source, callback} = req.query;
		const ssoToken = req.signedCookies[ '__sso_token' ];
		const payload = await verifyToken(ssoToken, config.jwt);

		if (payload) {
			const redirectUrl = `localhost:7000/token?token=${ssoToken}&source=/resource`;
			res.redirect(redirectUrl);
		} else {
			const filePath = path.join(__dirname, puplicFolder, 'login.html');
			res.sendFile(filePath);
		}
	});

	app.post('/login', async (req, res) => {

		const {email, password} = req.body;
		const user = await db.User.find({where: {email}});

		if (user && password && await user.comparePassword(password)) {
			const codeNumber = getRandomFromRange(1, 4);
			const tempToken = jwt.sign(
			  {id: user.id, codeNumber},
			  config.jwt,
			  {expiresIn: 60 * 2});

			// FIXME use it plz
			const redirectUrl = `/codes?source=/resource&callback=localhost:7000/token&token=${tempToken}&code=${codeNumber}`;
			res.redirect(redirectUrl);
		} else {
			res.status(401).json({error: 'user or password is incorrect'});
			return;
		}
	});

	app.get('/codes', async (req, res) => {
		res.cookie("temp_sso_token", req.query.token, {signed: true});

		const filePath = path.join(__dirname, puplicFolder, 'code.html');
		res.sendFile(filePath);
	});

	app.post('/codes', async (req, res) => {
		let {code} = req.body;

		let tempToken = req.signedCookies[ 'temp_sso_token' ];

		const payload = await verifyToken(tempToken, config.jwt);

		if (!payload) {
			res.status(408).send({error: 'Token timeout'});
		} else {
			const user = await db.User.findById(payload.id);
			if (user.codes.includes(code)) {

				const token = jwt.sign(
				  {id: user.id},
				  config.jwt,
				  {expiresIn: '30m'});

				res.cookie("__sso_token", token, {signed: true});

				const redirectUrl = `http://localhost:7000/token?token=${token}&source=/resource`;

				res.redirect(redirectUrl);

			} else {
				res.status(403).send({error: 'The inputted code does not match with an allowed codes list'});
			}

		}
		;
	});

	app.listen(config.appSso.port, () => {
		console.log(`sso server listen port ${config.appSso.port}`);
	});
})();

