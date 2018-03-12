import CrudService from './crud.service';

export default class Like extends CrudService {
  constructor ({context, schemas, errors}) {
    super(context['Like'], schemas['like'], errors);
    this.userRepository = context['User'];
    this.tweetRepository = context['Tweet'];
  }

  async readChunk (id) {
    const tweet = await this.tweetRepository.findById(id);
    if (!tweet) throw this.errors.notFound;

    return tweet.getLikes();
  }

  async create ({likerId, tweetId}) {
    const tweet = await this.tweetRepository.findById(tweetId);

    if (!tweet) throw this.errors.notFound;

    const liker = await this.userRepository.findById(likerId);

    if (!liker) throw this.errors.notFound;

    return tweet.addLikes([liker]);
  }

  async delete ({tweetId, id}) {
    return this.repository.destroy({where: {tweetId, id}});
  }
}
