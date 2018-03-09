import CrudService from './crud.service';

export default class User extends CrudService {
  constructor ({context, schemas, errors}) {
    super(context['User'], schemas['user'], errors);
  }

  async checkByToken (userId, token) {
    const user = await this.repository.findById(userId);

    if (!user) throw this.errors.notFound;

    if (user.dataValues.validationToken === token) {
      await user.update({validated: true});
    } else {
      throw this.errors.invalidToken;
    }
  }
}
