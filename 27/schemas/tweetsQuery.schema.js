import Joi from 'joi';

export default () => (
  {
    meta: {
      page: Joi.number(),
      limit: Joi.number(),
      orders: Joi.array().min(0).max(2),
      filters: Joi.array().min(0).max(3)
    },
    order: {
      field: Joi.only('publishedOn', 'author.name'),
      val: Joi.only('asc', 'desc')
    },
    filter: {
      field: Joi.only('author.email', 'publishedAfter', 'publishedBefore'),
      val: Joi.string()
    }
  });
