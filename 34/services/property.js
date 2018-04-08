const CrudService = require('./crud');
const validator = require('../helpers/validator');

class PropertyService extends CrudService {

    constructor(repository, agentsRepository, schema, errors) {
        super(repository, errors);

        this.agentsRepository = agentsRepository;
        this.schema = schema;
    }

    async create(data) {

        let validCheck = validator(this.schema, data);
        if (!validCheck.isValid)
            throw this.errors.validError(validCheck.errors);

        super.create(data);
    }

    async update(data) {

        let validCheck = validator(this.schema, data);
        if (!validCheck.isValid)
            throw this.errors.validError(validCheck.errors);

        return super.update(data.id, data);
    }

    async addAgent(propId, agentId) {
        const agent = await this.agentsRepository.findById(agentId);

        if (!agent) {
            throw this.errors.notFound;
        }

        return super.update(propId, {agentId});
    }

    async removeAgent(propId) {
        return super.update(propId, {agentId: null});
    }
}

module.exports = PropertyService;