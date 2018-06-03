module.exports = (Sequelize, sequelize) => sequelize.define('point', {
		id: {
			type: Sequelize.BIGINT,
			primaryKey: true,
			autoIncrement: true
		},
		name: Sequelize.STRING,
		time: Sequelize.INTEGER,
		vehicle: Sequelize.ENUM('bike', 'walk', 'car', 'bus')
	}
);
