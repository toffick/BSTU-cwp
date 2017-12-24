const express = require('express');
const router = express.Router();
const Validator = require('../lib/validator');

const validator = new Validator();

router.post('/create', function (req, res, next){
    let validMsg = validator.isValidCreateFilm(req.body);
    if (validMsg === validator.messages.VALID) {
        next();
    }
    else {
        next(validMsg);
    }
});
router.post('/update', function (req, res, next){
    let validMsg = validator.isValidUpdateFilm(req.body);
    if (validMsg === validator.messages.VALID) {
        next();
    }
    else {
        next(validMsg);
    }
});

module.exports = router;
