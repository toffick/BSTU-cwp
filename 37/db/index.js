const config = require('config');
const { task} = require('./models');

module.exports = (Sequelize) => {
	const sequelize = new Sequelize(config.db.name, config.db.user, config.db.pass, config.db.options);

	const Task = task(Sequelize, sequelize);

	return {
		Task,
		sequelize,
		Sequelize
	};
};
