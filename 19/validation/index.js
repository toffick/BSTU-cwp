const {Router} = require('express');
const validator = require('./validator');


module.exports = () =>{
    let route = new Router();

    route.use((req, res, next) =>{
        const validationResult = validator.check(req.originalUrl, req.body);

        if (validationResult.error) {
            console.log(validationResult);
            let message = validationResult.error.details.reduce((a, b) => a + b.message+"\r\n", "");
            let err = new Error(message);
            err.status = 400;
            next(err);
        } else {
            req.validation = {succeed: true};
            next();
        }
    });

    return route;
}