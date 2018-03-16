export const getPagesItems = (page, limit, items) => {
  return items.slice(
    (page - 1) * limit,
    (page - 1) * limit + limit);
};

export const normalizeLimit = (limit) => {
  if (limit < 5) {
    return 5;
  } else if (limit > 20) {
    return 20;
  } else {
    return +limit;
  }
};
