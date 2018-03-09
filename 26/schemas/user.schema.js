import Joi from 'joi';

export default {
  id: Joi.number(),
  name: Joi.string().min(1),
  email: Joi.string().email(),
  timezone: Joi.string().min(5),
  validated: Joi.boolean(),
  validationToken: Joi.string().min(10)
};
