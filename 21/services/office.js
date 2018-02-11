const CrudService = require('./crud');
const validator = require('../helpers/validator');

class OfficeService extends CrudService {

    constructor(repository, schema, errors) {
        super(repository, errors);

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

    async readAgents(officeId, options) {
        options = {
            limit: Number(options.limit) || this.defaults.readChunk.limit,
            offset: Number(options.offset) || this.defaults.readChunk.offset
        };

        const office = await this.repository.findById(officeId);

        if (!office) {
            throw this.errors.notFound;
        }

        return office.getAgents(options);
    }

}

module.exports = OfficeService;