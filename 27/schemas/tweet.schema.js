import Joi from 'joi';

export default () => ({
  publishedOn: Joi.number(),
  message: Joi.string().min(1),
  authorId: Joi.number()
});
