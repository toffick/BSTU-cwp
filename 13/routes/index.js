const express = require('express');
const router = express.Router();

const vehicles = require('./api/vehicles')();
const fleets = require('./api/fleets')();
const motions = require('./api/motions')();
const validator = require('./validator');

router.use('/fleets', validator('fleets'), fleets);
router.use('/motions', validator('motions'), motions);
router.use('/vehicles', validator('vehicles'), vehicles);

module.exports = router;
