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
    'author.email': (item) => {
      // console.log(get(item, field))/
      // console.log(val);
      console.log((get(item, field) === val));
      return get(item, field) === val;
    }
  };

  return FILTER_HANDLERS[field];
};

export const applySorting = (items, orders) => {
  // TODO
  return items;
};
