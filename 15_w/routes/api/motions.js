const {Router} = require('express');
const Repository = require('../../db/repository');
const sendResponse = require('../../services/sendResponse');
const geolib = require('geolib');

module.exports = function (model, vehicles){
    const repository = new Repository(model);
    const repositoryVehicle = new Repository(vehicles);
    const router = new Router();

    router.post('/create', async (req, res, next) =>{
        let motion = req.body;
        let vehicle = await repositoryVehicle.read(motion.vehicleId);
        if (vehicle && (req.manager.super || vehicle.fleetId === req.manager.fleetId)) {
            item = await repository.create(motion);
            sendResponse(res, 200, item);
        } else {
            sendResponse(res, 400, 'abuse of authority in motion creating');

        }
    });



    return router;
};

