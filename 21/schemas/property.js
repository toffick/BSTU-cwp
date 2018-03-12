const Joi = require('joi');

module.exports = {
	id: Joi.number(),
	price: Joi.number().positive(),
	currency: Joi.only(['BYN', 'USD', 'EUR']),
	heading: Joi.string().min(1),
	location: Joi.string().min(1),
	agentId: Joi.number()
};
