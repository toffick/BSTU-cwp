module.exports = (Sequelize, sequelize) => {
    return sequelize.define('offices', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: { type: Sequelize.STRING },
        website: { type: Sequelize.STRING },
        address: { type: Sequelize.STRING },
    });
};