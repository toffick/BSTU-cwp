import Joi from 'joi';

export default {
  id: Joi.number(),
  publishedOn: Joi.number(),
  message: Joi.string().min(1),
  authorId: Joi.number()
};
