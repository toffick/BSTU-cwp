import Joi from 'joi';

export default {
  name: Joi.string().min(3),
  logo: Joi.string().min(3)
};
