const Fleets = require('./fleets');
const Motions = require('./motions');
const Vehicles = require('./vehicles');

module.exports = (Sequelize, config) =>{
    const connection = new Sequelize(config.db.name, config.db.user, config.db.pass, config.db.options);

    const fleets = Fleets(Sequelize, connection);
    const motions = Motions(Sequelize, connection);
    const vehicles = Vehicles(Sequelize, connection);

    fleets.hasMany(vehicles, {foreignKey: {allowNull: false}, onDelete: 'CASCADE'});
    vehicles.hasMany(motions, {foreignKey: {allowNull: false}, onDelete: 'CASCADE'});

    return {
        Sequelize,
        connection,
        models: {
            fleets,
            motions,
            vehicles
        }
    };
};