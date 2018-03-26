const CrudService  = require('./crud');

module.exports =  class Person extends CrudService {
  constructor (context, errors) {
    super(context, errors);
  }
};
