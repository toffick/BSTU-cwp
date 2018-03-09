import CrudService from './crud.service';

export default class WorkPeriod extends CrudService {
  constructor ({context, schemas, errors}) {
    super(context['WorkPeriod'], schemas['workPeriod'], errors);
  }

}
