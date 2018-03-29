const {models} = require('./context');

class Repository {

    constructor(name){
        this.table = models[name];
        this.contextName = name;
    }

    readAll(id){
        if (id !== undefined && this.contextName === 'vehicles') {
            return this.table.findAll(
                {where: {fleetId: id}}
            );
        }
        else if (id !== undefined && this.contextName === 'motions') {
            return this.table.findAll(
                {where: {vehicleId: id}}
            );
        }
        else
            return this.table.findAll();
    }


    read(id){
        return this.table.findById(id);
    }

    update(data, id){
        return this.table.findById(id)
            .then(findResult =>{
                    if (findResult) {
                        return findResult.update(data);
                    }
                    else
                        return null;
                }
            )

    }

    create(data){
        return this.table.create(data)
            .then(result => result)
            .catch(err => err);
    }

    delete(id){
        return this.table.findById(id)
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
