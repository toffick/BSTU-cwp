import validator from '../../helpers/validator.helper';
import {normalizeLimit} from '../helpers/paginator.helper';

export default class CrudService {
  constructor (repository, schema, errors) {
    this.repository = repository;
    this.errors = errors;
    this.schema = schema;

    this.defaults = {
      readChunk: {
        limit: 10,
        offset: 0,
        sortOrder: 'asc',
        sortField: 'id'
      }
    };
  }

  async readChunk (options, where = {}, findOnce = false) {
    options = {
      ...this.defaults.readChunk,
      ...options
    };

    const {sortField, limit, offset, sortOrder} = options;

    let {count, rows} = await this.repository.findAndCountAll({
      where,
      limit: normalizeLimit(limit),
      offset: +offset,
      order: [[sortField, sortOrder.toUpperCase()]]
    });

    if (findOnce) {
      if (count === 0) {
        throw this.errors.notFound;
      } else if (count !== 1) {
        throw this.error.soManyRows;
      } else {
        rows = rows[0];
      }
    }

    return rows;
  }

  async read (id) {
    id = parseInt(id);

    if (isNaN(id)) {
      throw this.errors.invalidId;
    }

    const item = await this.repository.findById(id);

    if (!item) throw this.errors.notFound;

    return item;
  }

  async create (data) {
    this._validateBySchema(data);

    const item = await this.repository.create(data);

    return item.get({plain: true});
  }

  async update (where, data) {
    this._validateBySchema(data);

    if (typeof (where) !== 'object') {
      where = {id: where};
    }

    await this.repository.update(data, {where, limit: 1});

    return this.read(where.id);
  }

  async delete (where) {
    if (typeof (where) !== 'object') {
      where = {id: where};
    }

    return this.repository.destroy({where});
  }

  _validateBySchema (data) {
    let validCheck = validator(this.schema, data);
    if (!validCheck.isValid) {
      throw this.errors.validError(validCheck.errors);
    }
  }
}
