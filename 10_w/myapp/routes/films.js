const express = require('express');
const router = express.Router();
const Manager = require('../lib/manager');
const filmManager = new Manager();

router.get('/readall', function (req, res, next){
    res.json(filmManager.getAll());
});
router.get('/read/:id', function (req, res, next){
    res.json(filmManager.getFilmById(req.params.id));
});
router.post('/create', function (req, res, next){
    res.send(filmManager.create(req.body));
});
router.post('/update', function (req, res, next){
    res.json(filmManager.update(req.body));
});
router.post('/delete', function (req, res, next){
    res.json(filmManager.delete(req.body.id));
});


module.exports = router;
