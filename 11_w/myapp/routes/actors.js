const express = require('express');
const router = express.Router();
const CrudManager = require('../lib/crudmanager');
const actors = require('../content/actors.json');
const actorsManager = new CrudManager(actors,'liked','./content/actors.json');

router.get('/readall', function (req, res, next){
    res.json(actorsManager.getAll());
});
router.get('/read/:id', function (req, res, next){
    res.json(actorsManager.getFilmById(req.params.id));
});
router.post('/create', function (req, res, next){
    res.send(actorsManager.create(req.body));
});
router.post('/update', function (req, res, next){
    console.log(req.body);
    res.json(actorsManager.update(req.body));
});
router.post('/delete', function (req, res, next){
    res.json(actorsManager.delete(req.body.id));
});


module.exports = router;
