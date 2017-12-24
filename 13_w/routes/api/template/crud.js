const {Router} = require('express');


module.exports = (repository) =>{

    const router = new Router();

    router.get('/readall', async (req, res, next) =>{
        let items = await repository.readAll();
        res.json(items);
    });

    router.get('/readall/:id', async (req, res, next) =>{
        let item = await repository.readAll(req.params.id);
        if (item.length)
            res.json(item);
        else
            next({message: "items not found", status: 404});
    });

    router.get('/read/:id', async (req, res, next) =>{
        let item = await repository.read(req.params.id);
        if (item)
            res.json(item);
        else
            next({message: "item not found", status: 404});
    });

    router.post('/create', async (req, res, next) =>{
        let item = await repository.create(req.body);
        res.json(item);
    });

    router.put('/update/:id', async (req, res, next) =>{
        let item = await repository.update(req.body, req.params.id);
        if (item)
            res.json(item);
        else
            next({message: "item not found", status: 400});
    });

    router.delete('/delete/:id', async (req, res, next) =>{
        let item = await repository.delete(req.params.id);
        if (item)
            res.json(item);
        else
            next({message: "item not found", status: 400});
    });


    return router;
};