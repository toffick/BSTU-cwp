const config = require('config');
const {commit, repo} = require('./models');

module.exports = (Sequelize) => {
	const sequelize = new Sequelize(config.db.name, config.db.user, config.db.pass, config.db.options);

	const Commit = commit(Sequelize, sequelize);
	const Repo = repo(Sequelize, sequelize);

	Repo.hasMany(Commit);

	return {
		Commit,
		Repo,
		sequelize,
		Sequelize
	};
};
