const {Router} = require('express');
const validator = require('../../lib/validator');

module.exports = (models) =>{

    const router = new Router();

    router.get('/readall/:id', async (req, res, next) =>{
        if(validator.isValidId(req.params.id))
            next();
        else
            next({message: "bad ID value", status: 400})
    });

    router.use('/:action(create|update)', async (req, res, next) =>{
        switch (models) {
            case "fleets": {
                validator.isFleetValid(req.body) ? next() : next({message: "bad value", status: 400});
                break;
            }
            case "vehicles": {
                validator.isVehicleValid(req.body) ? next() : next({message: "bad value", status: 400});
                break;
            }
            case "motions": {
                validator.isMotionValid(req.body) ? next() : next({message: "bad value", status: 400});
                break;
            }
        }
    });
    return router;
}