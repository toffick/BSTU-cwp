import Joi from 'joi';

export default {
  id: Joi.number(),
  name: Joi.string().min(3),
  logo: Joi.string().min(3)
};
