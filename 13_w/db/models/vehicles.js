module.exports = (sequelize, connection) =>{
    return connection.define('vehicles', {
        id: {
            type: sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: sequelize.STRING(500),
            allowNull: false
        }
    });
};