const {Router} = require('express');
const Repository = require('../../db/repository');
const sendResponse = require('../../services/sendResponse');


module.exports = function (model){
    const repository = new Repository(model);

    const router = new Router();

    router.get('/readall', async (req, res, next) =>{
        if (req.manager.super) {
            let items = await repository.readAll();
            sendResponse(res, 200, items);
        } else {
            sendResponse(res, 403, 'only for superManager');
        }
    });


    router.get('/read(/:id)?', async (req, res, next) =>{
        if (req.manager.super) {
            let item = await repository.read(req.params.id);
            if (item)
                sendResponse(res, 200, item);
            else
                sendResponse(res, 404, 'item not found');
        } else {
            let item = await repository.read(req.manager.fleetId);
            sendResponse(res, 200, item);
        }

    });

    router.post('/create', async (req, res, next) =>{
        if (req.manager.super) {
            let item = await repository.create(req.body);
            sendResponse(res, 200, item);
        }
        else {
            sendResponse(res, 403, 'only for superManager');
        }
    });

    router.put('/update/:id', async (req, res, next) =>{
        if (req.manager.super) {
            let item = await repository.update(req.body, req.params.id);
            if (item)
                sendResponse(res, 200, item);
            else
                sendResponse(res, 404, 'item not found');
        }
        else {
            sendResponse(res, 403, 'only for superManager');
        }


    });

    router.delete('/delete/:id', async (req, res, next) =>{
        if (req.manager.super) {
            let item = await repository.delete(req.params.id);
            if (item)
                sendResponse(res, 200, item);
            else
                sendResponse(res, 404, 'item not found');
        }
        else {
            sendResponse(res, 403, 'only for superManager');
        }
    });


    return router;
};