const {Router} = require('express');
const Repository = require('../../db/repository');
const sendResponse = require('../../services/sendResponse');
const geolib = require('geolib');

module.exports = function (model){
    const repository = new Repository(model);

    const router = new Router();

    router.get('/readall', async (req, res, next) =>{
        let items;
        if (req.manager.super) {
            items = await repository.readAll();
        } else {
            items = await repository.readAll(req.manager.fleetId);
        }
        sendResponse(res, 200, items);

    });

    router.get('/read/:id', async (req, res, next) =>{
        let item = await repository.read(req.params.id);
        if (item && (req.manager.super || item.fleetId === req.manager.fleetId)) {
            sendResponse(res, 200, item);
        } else {
            sendResponse(res, 404, 'item not found');
        }
    });

    router.post('/create', async (req, res, next) =>{
        let item;
        if (req.manager.super) {
            item = await repository.create(req.body);
        } else {
            req.body.fleetId = req.manager.fleetId;
            item = await repository.create(req.body);
        }
        sendResponse(res, 200, item);
    });

    router.put('/update/:id', async (req, res, next) =>{

        let item = await repository.read(req.params.id);
        if (item && (req.manager.super || item.fleetId === req.manager.fleetId)) {
            let object = await repository.update(req.body,req.params.id);
            if (object)
                sendResponse(res, 200, object);
            else
                sendResponse(res, 408, 'invalid update data');

        } else {
            sendResponse(res, 404, 'item not found');
        }
    });

    router.delete('/delete/:id', async (req, res, next) =>{
        let item = await repository.read(req.params.id);
        if (item && (req.manager.super || item.fleetId === req.manager.fleetId)) {
            let object = await repository.delete(req.params.id);
            if (object)
                sendResponse(res, 200, object);
            else
                sendResponse(res, 408, 'invalid update data');

        } else {
            sendResponse(res, 404, 'item not found');
        }
    });

    router.get('/milage/:id', async (req, res, next) =>{
        let vehicle = await repository.read(req.params.id);
        if (vehicle && (req.manager.super || vehicle.fleetId === req.manager.fleetId)) {
            let items = await vehicle.getMotions();
            let path = geolib.getPathLength(items.map(val => val.latLng));
            sendResponse(res, 200, path);
        } else {
            sendResponse(res, 404, 'item not found');

        }
    });

    return router;
};