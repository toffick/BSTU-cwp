const {verifyToken} = require('../helpers');
const config = require('../config.json');

module.exports = (db) => async (req, res, next) => {

	const serviceToken = req.signedCookies['__service_token'];
	const payload = await verifyToken(serviceToken, config.jwt);

	if (payload && payload.id) {
		const user = db.User.findById(payload.id);
		req.user = user;
		console.log('next');
		next();

	} else {
		const sourceUrl = req.baseUrl;
		const callback = 'localhost:7000/token';
		const redirectUrl = `http://${config.appSso.host}:${config.appSso.port}/login?source=${sourceUrl}&callback=${callback}`;

		res.redirect(redirectUrl);
	}
};