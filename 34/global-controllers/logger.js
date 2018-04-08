module.exports = (loggerService) => (req, res, next) => {
    loggerService.log(req);

    next();
};