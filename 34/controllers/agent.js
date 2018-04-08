const CrudController = require('./crud');

class AgentController extends CrudController {
    constructor(agentService, cacheService) {
        super(agentService, cacheService);

        this.officeAdd = this.officeAdd.bind(this);
        this.officeRemove = this.officeRemove.bind(this);
        this.readProperties = this.readProperties.bind(this);

        this.routes['/officeadd'] = [{method: 'post', cb: this.officeAdd}];
        this.routes['/officeremove'] = [{method: 'post', cb: this.officeRemove}];
        this.routes['/properties'] = [{method: 'post', cb: this.readProperties}];

        this.registerRoutes();
    }

    async officeAdd(req, res) {
        await this.service.addOffice(req.body.id, req.body.officeId);

        res.json({success: true});
    }

    async officeRemove(req, res) {
        await this.service.removeOffice(req.body.id);

        res.json({success: true});
    }

    async readProperties(req, res) {
        res.json(await this.service.readProperties(req.body.id, req.query));
    }
}

module.exports = (agentService, cacheService) => {
    const controller = new AgentController(agentService, cacheService);

    return controller.router;
};