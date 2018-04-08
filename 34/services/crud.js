class CrudService {
    constructor(repository, errors) {
        this.repository = repository;
        this.errors = errors;

        this.defaults = {
            readChunk: {
                limit: 5,
                offset: 0,
                sortOrder: 'asc',
                sortField: 'id'
            }
        };
    }

    async readChunk(options) {
        options = Object.assign({}, this.defaults.readChunk, options);
        let limit = Number(options.limit) || this.defaults.readChunk.limit;
        let offset = Number(options.offset) || this.defaults.readChunk.offset;

        return await this.repository.findAll({
            limit: limit,
            offset: offset,
            order: [[options.sortField, options.sortOrder.toUpperCase()]],
            raw: true
        });
    }

    async read(id) {
        id = parseInt(id);

        if (isNaN(id)) {
            throw this.errors.invalidId;
        }

        const item = await this.repository.findById(id, {raw: true});

        if (!item) {
            throw this.errors.notFound;
        }

        return item;
    }

    async create(data) {
        const item = await this.repository.create(data);

        return item.get({plain: true});
    }

    async update(id, data) {
        await this.repository.update(data, {where: {id: id}, limit: 1});

        return this.read(id);
    }

    async delete(id) {
        return this.repository.destroy({where: {id: id}});
    }
}

module.exports = CrudService;
