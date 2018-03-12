import CrudService from './crud.service';

export default class User extends CrudService {
  constructor ({context, schemas, errors}) {
    super(context['User'], schemas['user'], errors);
  }

}
