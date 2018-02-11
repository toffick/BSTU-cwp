module.exports = (Sequelize, sequelize) => {
    return sequelize.define('agents', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: { type: Sequelize.STRING },
        email: { type: Sequelize.STRING },
        tel: { type: Sequelize.STRING },
    });
};