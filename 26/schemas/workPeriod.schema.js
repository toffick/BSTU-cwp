import Joi from 'joi';

export default {
  id: Joi.number(),
  from: Joi.string().min(1),
  to: Joi.string().min(1),
  weekDays: Joi.string().min(5),
  teamId: Joi.number(),
  userId: Joi.number()
};
