const CrudService = require('./CrudService');

class PizzaService extends CrudService
{
    constructor(repository,
                errors)
    {
        super(repository, errors);
    }

    getByFavoritePizza(filter, ids, db)
    {
			return super.readChunk({
            addingOptions: {
                where: {
                    id: {
                        [db.Op.in]: ids
                    },
                    name: {
                        [db.Op.like]: `%${filter}%`
                    }
                }
            }
        });
    }
}

module.exports = PizzaService;
