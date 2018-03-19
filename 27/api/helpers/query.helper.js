import validator from '../../helpers/validator.helper';
import get from 'lodash/get';

export const parseQueryItem = (queryItem, schema) => {
  if (queryItem) {
    const objects = queryItem
      .split('|')
      .map((item) => {
        const [field, val] = item.split(':');

        return {field, val};
      })
      .filter((item) => {
        let validCheck = validator(schema, item);
        // тут можно сообщать, что поле невалидно, но мне западло
        return validCheck.isValid;
      });

    return objects;
  }
};

export const applySorting = (items, orders) => {
  orders.forEach(({field, val}) => {
    //TODO тут что-то странное
    items = items.sort((a, b) => {
      return get(a, field) < get(b, field) ?
        -1 : get(a, field) < get(b, field) ?
          1 : 0;
    });
    if (val === 'desc') {
      items = items.reverse();
    }
  });
  return items;
};

export const applyFilters = (items, filters) => {
  filters.forEach((filterObj) => {
    const filterHandler = filterCreator(filterObj);

    if (filterHandler) {
      items = items.filter(filterHandler);
    }
  });
  return items;
};

const filterCreator = ({field, val}) => {
  const FILTER_HANDLERS = {
    'author.email': (item) => get(item, field) === val,
    'publishedAfter': (item) => get(item, 'publishedOn') > val,
    'publishedBefore': (item) => get(item, 'publishedOn') < val
  };

  return FILTER_HANDLERS[field];
};
