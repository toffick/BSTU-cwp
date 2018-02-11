module.exports = (Sequelize, sequelize) => {
    return sequelize.define('properties', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        heading: { type: Sequelize.STRING },
        price: Sequelize.INTEGER,
        currency: Sequelize.STRING,
        location: Sequelize.STRING,
    });
};