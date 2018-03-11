import CrudService from './crud.service';

export default class Like extends CrudService {
  constructor ({context, schemas, errors}) {
    super(context['Like'], schemas['like'], errors);
  }

//TODO
}
