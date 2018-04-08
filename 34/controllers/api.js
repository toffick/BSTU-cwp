const express = require('express');

module.exports = (
    propertyService,
    agentService,
    officeService,
    cacheService,
    config,
) => {
    const router = express.Router();

    const postsController = require('./agent')(agentService, cacheService);
    const usersController = require('./office')(officeService, cacheService);
    const rolesController = require('./property')(propertyService, cacheService);

    router.use('/agent', postsController);
    router.use('/office', usersController);
    router.use('/property', rolesController);

    return router;
};