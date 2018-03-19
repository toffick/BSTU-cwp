import Joi from 'joi';

export default () => ({
  id: Joi.number(),
  name: Joi.string().min(1),
  email: Joi.string().email()
});
