const Joi = require('joi');

module.exports = (schemaObject, data) => {
    if (!schemaObject) return false;

    let errors = '';
    let isValid = true;
    let schema = Joi.object().keys(schemaObject);

    let validationResult = Joi.validate(data, schema, {presence:'optional'});

    if (validationResult.error) {
        errors = validationResult.error.details.reduce((a, b) => a + b.message, "");
        isValid = false;
    }

    return {
        isValid,
        errors
    };
};