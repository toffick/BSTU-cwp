const {Router} = require('express');
const geolib = require('geolib');

module.exports = (repository) =>{

    const router = new Router();

    router.post('/create', async (req, res, next) =>{
        let item = await repository.create(req.body);
        res.json(item);
    });

    router.get('/milage/:id', async (req, res, next) =>{
        let items = await repository.readAll(req.params.id);
        let path = geolib.getPathLength(items.map(val => val.latLng));
        res.json(path);
    });

    return router;
};