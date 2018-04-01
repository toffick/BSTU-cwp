const jwt = require('jsonwebtoken');

module.exports.getRandomFromRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

module.exports.setTestData = async (db) => {
	await db.User.create({email: "1", password: '1', codes: [ '123', '234', '345', '456', '567' ]});
	await db.User.create({email: "2", password: '2', codes: [ '123', '234', '345', '456', '567' ]});
	await db.User.create({email: "3", password: '3', codes: [ '123', '234', '345', '456', '567' ]});
};

module.exports.verifyToken = async (token, secretKey) => {
	try {
		if (secretKey)
			return await jwt.verify(token, secretKey);
		else return;
	} catch (err) {
		return;
	}
};

