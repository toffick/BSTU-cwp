const config = require('config');
const { repo} = require('./models');

module.exports = (Sequelize) => {
	const sequelize = new Sequelize(config.db.name, config.db.user, config.db.pass, config.db.options);

	const Repo = repo(Sequelize, sequelize);

	return {
		Repo,
		sequelize,
		Sequelize
	};
};
