module.exports = (cacheService, loggerService) => async (req, res, next) => {
    const cached = await cacheService.get(req);

    if (cached) {
        loggerService.log(req, 'FROM CACHE');
        res.json(cached);
        return;
    }

    next();
};