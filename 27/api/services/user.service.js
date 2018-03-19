import CrudService from './crud.service';

export default class User extends CrudService {
  constructor ({context, userSchema, errors}) {
    super(context['User'], userSchema, errors);
  }
}
