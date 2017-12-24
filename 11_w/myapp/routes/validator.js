const express = require('express');
const router = express.Router();
const Validator = require('../lib/validator');

const validator = new Validator();

router.post('/*(create|update)', function (req, res, next){
    let type = req.baseUrl.split('/').pop();
    let validMsg = validator.isValidCreateBody(req.body, type);
    if (validMsg === validator.messages.VALID) {
        next();
    }
    else {
        next(validMsg);
    }
});

module.exports = router;
