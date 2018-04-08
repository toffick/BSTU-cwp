const Joi = require('joi');

module.exports = {
    id: Joi.number(),
    title: Joi.string().min(1),
    website: Joi.string().min(1),
    address: Joi.string().min(1),
};
