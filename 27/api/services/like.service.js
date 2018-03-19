import CrudService from './crud.service';

export default class Like extends CrudService {
  constructor ({context, likeSchema, errors}) {
    super(context['Like'], likeSchema, errors);
    this.userRepository = context['User'];
  }

  async readChunk (tweet) {
    return tweet.getLikes();
  }

  async create ({tweetId, likerId}) {
    const liker = await this.userRepository.findById(likerId);

    if (!liker) throw this.errors.notFound;

    return this.repository.findOrCreate({where: {tweetId, authorId: likerId}});
  }

  async delete ({tweetId, likerId}) {
    const liker = await this.userRepository.findById(likerId);

    if (!liker) throw this.errors.notFound;

    return this.repository.destroy({where: {tweetId, authorId: likerId}});
  }
}
