const CrudController = require('./crud');

class PropertyController extends CrudController {
    constructor(propertyService, cacheService) {
        super(propertyService, cacheService);

        this.agentAdd = this.agentAdd.bind(this);
        this.agentRemove = this.agentRemove.bind(this);

        this.routes['/agentadd'] = [{method: 'post', cb: this.agentAdd}];
        this.routes['/agentremove'] = [{method: 'post', cb: this.agentRemove}];

        this.registerRoutes();
    }

    async agentAdd(req, res) {
        await this.service.addAgent(req.body.id, req.body.agentId);

        res.json({success: true});
    }

    async agentRemove(req, res) {
        await this.service.removeAgent(req.body.id);

        res.json({success: true});
    }
}

module.exports = (propertyService, cacheService) => {
    const controller = new PropertyController(propertyService, cacheService);

    return controller.router;
};