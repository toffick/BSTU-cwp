const fleetsContent = require('../db/content/fleets.json');
const vehiclesContent = require('../db/content/vehicles.json');
const motionsContent = require('../db/content/motions.json');
const managerContent = require('../db/content/manager.json');


module.exports = async (models) =>{
    await Promise.all([
        models.fleets.create(fleetsContent[0]),
        models.fleets.create(fleetsContent[1]),
        models.fleets.create(fleetsContent[2]),
        models.vehicles.create(vehiclesContent[0]),
        models.vehicles.create(vehiclesContent[1]),
        models.vehicles.create(vehiclesContent[2]),
        models.vehicles.create(vehiclesContent[3]),
        models.vehicles.create(vehiclesContent[4]),
        models.vehicles.create(vehiclesContent[5]),
        models.vehicles.create(vehiclesContent[6]),
        models.vehicles.create(vehiclesContent[7]),
        models.motions.create(motionsContent[0]),
        models.motions.create(motionsContent[1]),
        models.motions.create(motionsContent[2]),
        models.motions.create(motionsContent[3]),
        models.managers.create(managerContent[0]),
        models.managers.create(managerContent[1]),
        models.managers.create(managerContent[2]),
    ]);
};