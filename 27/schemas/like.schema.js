import Joi from 'joi';

export default () => ({
  authorId: Joi.number(),
  tweetId: Joi.number()
});
