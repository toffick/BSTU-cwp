const {verifyToken} = require('../helpers');
const config = require('../config.json');

module.exports = (db) => async (req, res, next) => {

	const serviceToken = req.signedCookies['__service_token'];
	const payload = await verifyToken(serviceToken, config.jwt);

	if (payload && payload.id) {
		const user = await db.User.findById(payload.id);
		req.user = user;

		next();
	} else {
		res.redirect(`http://${config.appSso.host}:${config.appSso.port}/login?source=${req.originalUrl}&callback=${config.appService.authCb}`);
	}
};