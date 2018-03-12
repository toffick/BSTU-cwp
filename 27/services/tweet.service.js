import CrudService from './crud.service';

export default class Tweet extends CrudService {
  constructor ({context, schemas, errors}) {
    super(context['Tweet'], schemas['tweet'], errors);
  }

}
