module.exports = (Sequelize, sequelize) => sequelize.define('task', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			text: Sequelize.STRING
		}
);
