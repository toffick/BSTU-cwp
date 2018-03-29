const express = require('express');
const router = express.Router();
const Auth = require('../services/auth');
const sendResponse = require('../services/sendResponse');

const secretKey = '78df767a86f78as-67fg87sd6s78f6a-6sd8f6876sd-sd678f68sd6f87';

module.exports = function (db){
    const vehicles = require('./api/vehicles')(db.models.vehicles);
    const fleets = require('./api/fleets')(db.models.fleets);
    const motions = require('./api/motions')(db.models.motions,db.models.vehicles);
    const auth = require('./auth');
    const validator = require('./validator');

    let _auth = new Auth(db.models.managers, secretKey);

    router.use(/^\/(?!auth).*/, async (req, res, next) =>{
        let authHeader = req.header('Authorization');
        if (authHeader) {
            let token = authHeader.split(' ')[1];
            let payload = await _auth.verifyToken(token);
            if (payload) {
                let manager = await _auth.getManagerById(payload.id);
                if (manager) {
                    req.manager = manager.get({raw: true});
                    next();
                }
                else {
                    sendResponse(res, 403, 'manager does not exist');
                }
            }
            else {
                sendResponse(res, 403, 'invalid token');
            }
        }
        else {
            sendResponse(res, 401, 'unauthorized access');
        }
    });
    router.use('/auth', auth(_auth));
    router.use('/fleets', validator('fleets'), fleets);
    router.use('/motions', validator('motions'), motions);
    router.use('/vehicles', validator('vehicles'), vehicles);


    return router;
};
