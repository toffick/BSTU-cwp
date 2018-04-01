const {Router} = require('express');
const {verifyToken} = require('../helpers');
const path = require('path');
const config = require('../config.json');
const {getRandomFromRange} = require('../helpers');
const jwt = require('jsonwebtoken');


module.exports = (db) => {

	const puplicFolder = './public';
	const router = Router();

	let callback = '';
	let source = '';
	let tokenFirstFactor = '';
	let currentCodeNumber = 0;

	const resetAuth = () => {
		callback = '';
		source = '';
		tokenFirstFactor = '';
		currentCodeNumber = 0;
	}

	router.get('/login', async (req, res) => {

		callback = req.query.callback
		source = req.query.source;

		const ssoToken = req.signedCookies[ '__sso_token' ];
		const payload = await verifyToken(ssoToken, config.jwt);

		if (payload) {
			res.redirect(`localhost:7000/token?token=${ssoToken}&source=${source}&`);
		} else {
			res.sendFile(path.join(__dirname, puplicFolder, 'login.html'));
		}
	});

	router.post('/login', async (req, res) => {

		const {email, password} = req.body;
		const user = await db.User.find({where: {email}});

		if (user && password && await user.comparePassword(password)) {

			currentCodeNumber = getRandomFromRange(1, 4);
			const tempToken = jwt.sign(
			  {id: user.id, currentCodeNumber},
			  config.jwt,
			  {expiresIn: 60});

			res.redirect(`/codes?code=${currentCodeNumber}&source=${source}&callback=${callback}&token=${tempToken}`);
		} else {
			res.status(401).json({error: 'user or password is incorrect'});
		}
	});

	router.get('/codes', async (req, res) => {
		tokenFirstFactor = req.query.token;

		res.sendFile(path.join(__dirname, puplicFolder, 'code.html'));
	});

	router.post('/codes', async (req, res) => {
		let {code} = req.body;

		const payload = await verifyToken(tokenFirstFactor, config.jwt);

		if (!payload) {
			res.status(408).send({error: 'Invalid first factor token'});
		} else {
			const user = await db.User.findById(payload.id);

			if (user.codes[ currentCodeNumber ] == code) {
				const token = jwt.sign(
				  {id: user.id},
				  config.jwt,
				  {expiresIn: 30 * 60});

				res.cookie("__sso_token", token, {signed: true});
				res.redirect(`http://${callback}?token=${token}&source=${source}`);
			} else {
				res.status(403).send({error: 'The inputted code does not match with an allowed codes list'});
			}

			resetAuth();
		}
	});

	return router;
}