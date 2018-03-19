export default ({context, errors}) => async (req, res, next) => {
  const userId = req.params.userId || null;
  const tweetId = req.params.tweetId || null;

  if (userId) {
    const user = await context['User'].findById(userId);

    if (!user) next(errors.notFound);

    req.meta.user = user;
  }

  if (tweetId) {
    const tweet = await context['Tweet'].findOne({where: {id: tweetId, authorId: req.meta.user.dataValues.id}});

    if (!tweet) {
      next(errors.custom('Tweet not found or doesn\'t associated with founded user', 'tweet_not_found', 404));
    }

    req.meta.tweet = tweet;
  }

  next();
};
