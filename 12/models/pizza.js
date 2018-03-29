module.exports = (Sequelize, sequelize) =>{
    return sequelize.define('pizzas', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING(500),
            allowNull: false
        },
        description: {
            type: Sequelize.STRING(500),
            allowNull: false
        },
        calories: {
            type: Sequelize.DOUBLE,
            allowNull: false
        }
    });
};

