const Fleets = require('./models/fleets');
const Motions = require('./models/motions');
const Vehicles = require('./models/vehicles');
const Manager = require('./models/manager');
const config = require('./config.json');

module.exports = (Sequelize) =>{
    const connection = new Sequelize(config.db.name, config.db.user, config.db.pass, config.db.options);

    const fleets = Fleets(Sequelize, connection);
    const motions = Motions(Sequelize, connection);
    const vehicles = Vehicles(Sequelize, connection);
    const managers = Manager(Sequelize, connection);

    fleets.hasOne(managers);
    fleets.hasMany(vehicles, {foreignKey: {allowNull: false}, onDelete: 'CASCADE'});
    vehicles.hasMany(motions, {foreignKey: {allowNull: false}, onDelete: 'CASCADE'});

    return {
        Sequelize,
        connection,
        models: {
            fleets,
            motions,
            vehicles,
            managers
        }
    };
};