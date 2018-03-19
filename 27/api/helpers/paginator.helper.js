export const normalizeLimit = (limit) => {
  limit = +limit;

  if (!limit || !parseInt(limit) || limit < 5) {
    return 5;
  } else if (limit > 20) {
    return 20;
  } else {
    return limit;
  }
};

export const getPages = (array, page, limit) => {
  page = +page;

  const meta = {};
  const start = (page - 1) * limit;
  const end = page * limit;

  const items = array.slice(start, end);
  if (items.length === 0) {
    return meta;
  }

  if (page > 1) {
    meta.prev = page - 1;
  }

  if (end < array.length) {
    meta.next = page + 1;
  }

  if (items.length !== array.length) {
    meta.current = page;
    meta.first = 1;
    meta.last = Math.ceil(array.length / limit);
  }

  return {items, meta};
};
