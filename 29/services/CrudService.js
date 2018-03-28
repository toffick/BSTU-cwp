//const validator = require('./../../../validators/validator');

class CrudService
{
    constructor(repository, errors) {
        this.repository = repository;
        this.errors = errors;

        this.defaults = {
            readChunk: {
                limit: 10,
                page: 1,
                order: [
                    ['id', 'ASC']
                ]
            }
        };
    }

    readChunk(options, repository) {
        repository = repository || this.repository;
        options = Object.assign(
            {}, this.defaults.readChunk, options
        );

        let limit = options.limit;
        let offset = (options.page - 1) * options.limit;

        let findOptions = {
            limit: limit,
            offset: offset,
            order: options.order,
            raw: true
        };
        if (options.addingOptions !== undefined) {
            findOptions = Object.assign(
                {}, findOptions, options.addingOptions
            );
        }

        if (findOptions.withMetaData !== undefined) {
            let data = repository.findAndCount(findOptions);
            return {
                data: data.rows,
                meta: {
                    offset: offset,
                    limit: options.limit,
                    page: options.page,
                    order:  options.order,
                    count: data.count,
                },
            }
        } else {
            return repository.findAll(findOptions);
        }
    }

    read(id, repository) {
        repository = repository || this.repository;

        return repository.findById(
            id
        );
    }

    async create(req, repository) {
        repository = repository || this.repository;


        try {
            return await repository.create(req.body);
        } catch (error) {
            throw this.errors.invalidId;
        }
    }

    async update(req, where, repository) {
        repository = repository || this.repository;

        return repository.update(req.body, {
            where: where,
            limit: 1
        });
    }

    async delete(id, repository) {
        repository = repository || this.repository;
        id = parseInt(id);

        if (isNaN(id)) {
            throw this.errors.invalidId;
        }
        return await repository.destroy({
            where: { id: id }
        });
    }
}

module.exports = CrudService;
