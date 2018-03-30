const bcrypt = require('bcrypt');

module.exports = (Sequelize, sequelize) => {
	const model = sequelize.define('User', {
				id: {
					type: Sequelize.INTEGER,
					primaryKey: true,
					autoIncrement: true
				},
				email: Sequelize.STRING,
				password: Sequelize.STRING,
				codes: {
					type: Sequelize.STRING,
					set(val) {
						this.setDataValue('codes', JSON.stringify(val));
					},
					get() {
						return JSON.parse(this.getDataValue('codes'));
					}
				}
			},
			{
				hooks: {
					beforeCreate: (user) => {
						return bcrypt.genSalt(11)
								.then((salt) => bcrypt.hash(user.password, salt))
								.then((hash) => user.password = hash);
					}
				}
			}
	);

	model.prototype.comparePassword = async function (comparePassword) {
		return bcrypt.compare(comparePassword, this.getDataValue('password'));
	};

	return model;
};
