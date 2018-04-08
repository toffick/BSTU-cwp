const CrudController = require('./crud');

class OfficeController extends CrudController {
    constructor(agentService, cacheService) {
        super(agentService, cacheService);

        this.readAgents = this.readAgents.bind(this);

        this.routes['/agents'] = [{method: 'post', cb: this.readAgents}];

        this.registerRoutes();
    }

    async readAgents(req, res) {
        res.json(await this.service.readAgents(req.body.id, req.query));
    }
}

module.exports = (officeService, cacheService) => {
    const controller = new OfficeController(officeService, cacheService);

    return controller.router;
};