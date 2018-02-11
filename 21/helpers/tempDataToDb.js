const offices = require('../data/db/offices.json');
const property = require('../data/db/properties.json');
const agents = require('../data/db/agents.json');

module.exports = async (db) => {
    await db.offices.bulkCreate(offices);
    await db.agents.bulkCreate(agents);
    await db.properties.bulkCreate(property);
};