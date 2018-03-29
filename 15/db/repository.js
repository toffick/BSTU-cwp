class Repository {

    constructor(_model){
        this.model = _model;
        this.contextName = _model.name;
    }

    readAll(id){
        if (id !== undefined && this.contextName === 'vehicles') {
            return this.model.findAll(
                {where: {fleetId: id}}
            );
        }
        else if (id !== undefined && this.contextName === 'motions') {
            return this.model.findAll(
                {where: {vehicleId: id}}
            );
        }
        else
            return this.model.findAll();
    }


    read(id){
        return this.model.findById(id);
    }

    update(data, id){
        return this.model.findById(id)
            .then(findResult =>{
                    if (findResult) {
                        return findResult.update(data);
                    }
                    else
                        return null;
                }
            ).catch(err => console.log(err));

    }

    create(data){
        return this.model.create(data)
            .then(result => result)
            .catch(err => err);
    }

    delete(id){
        return this.model.findById(id)
            .then(findResult =>{
                    if (findResult) {
                        return findResult.destroy();
                    }
                    else
                        return null;
                }
            )
    }


}

module.exports = Repository;
