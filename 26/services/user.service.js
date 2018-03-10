import CrudService from './crud.service';

export default class User extends CrudService {
  constructor ({context, schemas, errors}) {
    super(context['User'], schemas['user'], errors);
  }

  async create (data) {
    data.validated = false;

    return super.create(data);
  }

  async checkByToken (userId, token) {
    const user = await this.repository.findById(userId);

    if (!user) throw this.errors.notFound;

    if (user.validationToken === token) {
      await user.update({validated: true});
    } else {
      throw this.errors.invalidToken;
    }
  }
}
