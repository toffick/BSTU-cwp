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

export const applyPagination = (array, page, limit) => {
  page = +page;

  const pagination = {};
  const start = (page - 1) * limit;
  const end = page * limit;

  const items = array.slice(start, end);
  if (items.length === 0) {
    pagination.current = page;
    pagination.first = 1;
    pagination.last = 1;
    return {items, pagination};
  }

  if (page > 1) {
    pagination.prev = page - 1;
  }

  if (end < array.length) {
    pagination.next = page + 1;
  }

  if (items.length !== array.length) {
    pagination.current = page;
    pagination.first = 1;
    pagination.last = Math.ceil(array.length / limit);
  }

  return {items, pagination};
};
