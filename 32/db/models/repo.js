module.exports = (Sequelize, sequelize) => sequelize.define('repo', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			name: Sequelize.STRING,
			author: Sequelize.STRING
		}
)
