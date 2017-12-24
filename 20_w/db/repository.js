const Sequelize = require('sequelize');
const {models} = require('./index.js')(Sequelize);

class Repository {

    constructor(name){
        this.model = models[name];
    }

    readAll(findInfo){
        return this.model.findAll({...findInfo, raw: true});
    }

    readWhere(condition){
        return this.model.findOne({...condition, raw: true});
    }

    read(id){
        return this.model.findById(id);
    }

    update(data, id){
        return this.model.findById(id)
            .then(findResult =>{
                if (findResult) return findResult.update(data);
                else return null;
            })
            .catch(err => console.log(err));

    }

    create(data){
        return this.model.create(data)
            .then(result => result)
            .catch(err => err);
    }

    delete(id){
        return this.model.findById(id)
            .then(findResult =>{
                if (findResult) return findResult.destroy();
                else return null;
            })
            .catch(err => err);
    }

    findAndCountAll(findInfo){
        return this.model.findAndCountAll({...findInfo, raw: true});
    }

    count(where){
        return this.model.count(where);
    }

}

module.exports = Repository;
