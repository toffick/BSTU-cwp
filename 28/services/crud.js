module.exports = class CrudService {
  constructor(repository, errors) {
    this.repository = repository;
    this.errors = errors;

    this.defaults = {
      readChunk: {
        limit: 10,
        offset: 0,
        sortOrder: 'asc',
        sortField: 'id'
      }
    };
  }

  async readChunk(options, where = {}, findOnce = false) {
    const {sortField, limit, offset, sortOrder} = this.defaults.readChunk;

    let {rows, count} = await this.repository.findAndCountAll({
      where,
      limit,
      offset,
      order: [[sortField, sortOrder.toUpperCase()]]
    });

    if (findOnce) {
      if (count === 0) {
        throw this.errors.notFound;
      } else if (count !== 1) {
        throw this.errors.soManyRows;
      } else {
        rows = rows[0];
      }
    }

    return rows;
  }

  async read(id) {
    id = parseInt(id);

    if (isNaN(id)) {
      throw this.errors.invalidId;
    }

    const item = await this.repository.findById(id);

    if (!item) throw this.errors.notFound;

    return item;
  }

  async create(data) {
    const item = await this.repository.create(data);

    return item.get({plain: true});
  }

  async update(where, data) {

    if (typeof (where) !== 'object') {
      where = {id: where};
    }

    await this.repository.update(data, {where, limit: 1});

    return this.read(where.id);
  }

  async delete(where) {
    if (typeof (where) !== 'object') {
      where = {id: where};
    }

    return this.repository.destroy({where});
  }

};
