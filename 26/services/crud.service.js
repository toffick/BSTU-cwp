import validator from '../helpers/validator.helper';

export default class CrudService {
  constructor (repository, schema, errors) {
    this.repository = repository;
    this.errors = errors;
    this.schema = schema;

    this.defaults = {
      readChunk: {
        limit: 5,
        offset: 0,
        sortOrder: 'asc',
        sortField: 'id'
      }
    };
  }

  readChunk (options, whereConditions) {
    options = {
      ...this.defaults.readChunk,
      ...options
    };
    let limit = Number(options.limit) || this.defaults.readChunk.limit;
    let offset = Number(options.offset) || this.defaults.readChunk.offset;

    return this.repository.findAll({
      where: {...whereConditions},
      limit,
      offset,
      order: [[options.sortField, options.sortOrder.toUpperCase()]],
      raw: true
    });
  }

  async read (id) {
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

  async create (data) {
    this._validateBySchema(data);

    const item = await this.repository.create(data);

    return item.get({plain: true});
  }

  async update (id, data) {
    this._validateBySchema(data);

    await this.repository.update(data, {where: {id: id}, limit: 1});

    return this.read(id);
  }

  async delete (id) {
    return this.repository.destroy({where: {id: id}});
  }

  _validateBySchema (data) {
    let validCheck = validator(this.schema, data);
    if (!validCheck.isValid) {
      throw this.errors.validError(validCheck.errors);
    }
  }
}
