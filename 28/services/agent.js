const CrudService  = require('./crud');

module.exports =  class Agent extends CrudService {
  constructor (context, errors) {
    super(context, errors);
  }
};
