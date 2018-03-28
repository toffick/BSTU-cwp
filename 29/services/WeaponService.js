const CrudService = require('./CrudService');

class WeaponService extends CrudService
{
    constructor(repository,
                errors)
    {
        super(repository, errors);
    }

    async create(req) {
        req.body.when = new Date(req.body.when).toUTCString();
        req.body.personId = req.params.personId;
        return super.create(req);
    }

    async update(req) {

        return super.update(req, {
            personId : req.params.personId
        });
    }

}

module.exports = WeaponService;
