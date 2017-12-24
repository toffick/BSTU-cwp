const Joi = require('joi');

const signupScheme = {
    login: Joi.string(),
    password: Joi.string().min(10),
    email: Joi.string().email().optional(),
    invitedBy: Joi.string().optional(),
    birth: Joi.date().max('1-1-1996'),
    sex: Joi.allow(['male', 'female', 'other']),
    agreedWithTerms: Joi.boolean().default(true)
};


const drinksScheme = {
    name: Joi.string().min(3).max(50),
    strength: Joi.number().min(0),
    code: Joi.string().regex(/^[a-zA-Z0-9]+$/),
    alcoholic: Joi.boolean().when('strength', {
        is: Joi.number().greater(0),
        then: Joi.valid(true),
        otherwise: Joi.valid(false)
    })
};


const ingredients = {
    name: Joi.string(),
    weight: Joi.number().positive(),
    photos: Joi.array().items(Joi.string()).optional()
};

const recipesScheme = {
    ingredients: Joi.array().items(ingredients).min(2).unique('name'),
    photos: Joi.array().items(Joi.string()).optional(),
    portions: Joi.alternatives().try([
        Joi.number().positive(),
        Joi.string(),
    ])
};

const schemas = {
    '/signin': Joi.object().keys({
        login: Joi.string(),
        password: Joi.string(),
    }),
    '/signup': Joi.object().keys(signupScheme),
    '/drinks': Joi.object().keys(drinksScheme),
    '/recipes': Joi.object().keys(recipesScheme)

};


exports.check = function (schema, body){
    if (!schemas[schema]) return {};

    return Joi.validate(body, schemas[schema], {presence: 'required'});
};