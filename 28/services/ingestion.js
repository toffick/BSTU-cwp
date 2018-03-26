const CrudService  = require('./crud');

module.exports =  class Ingestion extends CrudService {
  constructor (context, errors) {
    super(context, errors);
  }

};
