const express = require('express');
const router = express.Router();
const films = require('./films');
const actors = require('./actors');
const validator = require('./validator');
const logger = require('morgan');
const path = require('path');
const fs = require('fs');


router.use(logger(function (tokens, req, res){
    return [
        (new Date).toLocaleString(),
        tokens.url(req, res),
        req.params ? Object.values(req.params).join(' ') : ''
    ].join(' ')
}, {stream: fs.createWriteStream(path.join("./", 'log.log'), {flags: 'a', encoding: 'utf8'})}));

router.use('/films', validator, films);
router.use('/actors', validator, actors);

module.exports = router;


