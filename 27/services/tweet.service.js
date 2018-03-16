import CrudService from './crud.service';

export default class Tweets extends CrudService {
  constructor ({context, schemas, errors}) {
    super(context['Tweet'], schemas['tweet'], errors);
    this.userRepository = context['User'];
  }

  async readAllWithAuthors (options) {

    options = {
      ...this.defaults.readChunk,
      ...options
    };

    const {sortField, limit, sortOrder, page = 1} = options;

    let {count, rows} = await this.repository.findAndCountAll({
      order: [[sortField, sortOrder.toUpperCase()]],
      include: {
        model: this.userRepository,
        as: 'author',
        attributes: ['name']
      }
    });

    return rows;
  }
}
