const  CrudService = require('./crud');


module.exports =  class Food extends CrudService {
  constructor (context, errors) {
    super(context,  errors);
  }
};
