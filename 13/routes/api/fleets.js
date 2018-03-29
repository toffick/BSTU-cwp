const template = require('./template/crud');
const Repository = require('../../db/repository');

const repository = new Repository('fleets');

module.exports = function (){
    return template(repository);
};