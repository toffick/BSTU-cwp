const bcrypt = require('bcrypt');

module.exports = (Sequelize, sequelize) => (sequelize.define('commit', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			repoId: Sequelize.INTEGER,
			message: Sequelize.STRING,
			hash: {
				type: Sequelize.STRING,
				set(val) {
					bcrypt.genSalt(11)
							.then((salt) => {
										const msg = this.getDataValue('message');
										// return bcrypt.hash(this.getDataValue('message'), salt))
										return bcrypt.hash(this.getDataValue('message'), salt)
									}
							)
							.then((hash) => this.setDataValue('hash', hash));
				}
			}
		})
);
