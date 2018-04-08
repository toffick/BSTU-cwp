module.exports = (Sequelize, config) => {

    const sequelize = new Sequelize(config.db.name, config.db.user, config.db.pass, config.db.options);

    const Property = require('../models/property')(Sequelize, sequelize);
    const Offices = require('../models/offices')(Sequelize, sequelize);
    const Agents = require('../models/agents')(Sequelize, sequelize);

    Agents.hasMany(Property, {foreignKey: 'agentId'});
    Property.belongsTo(Agents, {constraints: false, foreignKey: 'agentId'});

    Offices.hasMany(Agents, {foreignKey: 'officeId'});
    Agents.belongsTo(Offices, {constraints: false, foreignKey: 'officeId'});

    return {
        properties: Property,
        offices: Offices,
        agents: Agents,
        sequelize,
        Sequelize,
    };
};