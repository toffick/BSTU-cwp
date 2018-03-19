import CrudService from './crud.service';
import {applyFilters, applySorting} from '../helpers/query.helper';
import {getPages} from '../helpers/paginator.helper';

export default class Tweets extends CrudService {
  constructor ({context, tweetSchema, errors}) {
    super(context['Tweet'], tweetSchema, errors);
    this.userRepository = context['User'];
  }

  async create (data) {
    data.publishedOn = Date.now();

    return super.create(data);
  };

  async readAllWithAuthors (options) {
    const {orders, filters, page, limit} = options;

    if (orders.length === 0) {
      orders.push({field: 'publishedOn', val: 'desc'});
    }

    const rows = await this.repository.findAll({
      include: {
        model: this.userRepository,
        as: 'author',
        attributes: ['name', 'email']
      }
    });

    let {items, meta} = getPages(rows, page, limit);
    items = applyFilters(items, filters);
    items = applySorting(items, orders);
    // фильтры js
    // сорировка через js

    return {items, meta};
  }
}
