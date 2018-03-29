const template = require('./template/motions');
const Repository = require('../../db/repository');

const repository = new Repository('motions');

module.exports = function (){
    return template(repository);
};

