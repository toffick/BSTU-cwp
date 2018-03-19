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
      return a[field] < b[field] ?
        -1 : a[field] < b[field] ?
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
    'author.email': (item) => item[field] === val,
    'publishedAfter': (item) => item['publishedOn'] > val,
    'publishedBefore': (item) => item['publishedOn'] < val
  };

  return FILTER_HANDLERS[field];
};

export function addLinks (tweet, index, tweets) {
  tweet.links = [];

  // тут получаем его как-то динамически
  const prefix = 'http://localhost:9001/api/users';

  if (tweets[index - 1]) {
    tweet.links.push({
      rel: 'prev',
      href: `${prefix}/${tweets[index - 1]['author.id']}/tweets/${tweets[index - 1].id}`,
    });
  }

  tweet.links.push({
    rel: 'self',
    href: `${prefix}/${tweet['author.id']}/tweets/${tweet.id}`,
  });

  if (tweets[index + 1]) {
    tweet.links.push({
      rel: 'next',
      href: `${prefix}/${tweets[index + 1]['author.id']}/tweets/${tweets[index + 1].id}`,
    });
  }

  return tweet;
}
