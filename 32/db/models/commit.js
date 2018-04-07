const bcrypt = require('bcrypt');

module.exports = (Sequelize, sequelize) => (sequelize.define('commit', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			message: Sequelize.STRING,
			hash: Sequelize.STRING,
		}, {
			updateOnDuplicate: ['hash'],
			hooks: {
				beforeCreate: (commit) => bcrypt.genSalt(11)
						.then((salt) => bcrypt.hash(commit.message, salt))
						.then((hash) => commit.hash = hash)
			}
		})
);
