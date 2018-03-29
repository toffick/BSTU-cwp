const CrudService = require('./CrudService');

class PizzaService extends CrudService
{
    constructor(repository,
                errors)
    {
        super(repository, errors);
    }

}

module.exports = PizzaService;
