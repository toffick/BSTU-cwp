module.exports = (Sequelize, sequelize) => sequelize.define('task', {
		id: {
			type: Sequelize.BIGINT,
			primaryKey: true,
		},
		completed: Sequelize.BOOLEAN,
		text: Sequelize.STRING
	}
);
