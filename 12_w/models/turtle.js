module.exports = (Sequelize, sequelize) =>{
    return sequelize.define('turtles', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING(500),
            allowNull: false
        },
        color: {
            type: Sequelize.STRING(500),
            allowNull: false
        }
    });
};