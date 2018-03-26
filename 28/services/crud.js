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

    let items = await this.repository.findAll({
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
        items = items[0];
      }
    }

    return items;
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
