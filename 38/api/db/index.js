const config = require('config');
const { point } = require('./models');

module.exports = (Sequelize) => {
	const sequelize = new Sequelize(config.db.name, config.db.user, config.db.pass, config.db.options);

	const Point = point(Sequelize, sequelize);

	return {
		Point,
		sequelize,
		Sequelize
	};
};
