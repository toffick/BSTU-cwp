const template = require('./template/crud');
const Repository = require('../../db/repository');

const repository = new Repository('vehicles');

module.exports = function (){
    return template(repository);
};
