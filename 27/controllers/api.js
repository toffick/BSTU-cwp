import {Router} from 'express';

module.exports = ({
  userController,
  tweetsController
}) => {
  const router = Router();

  router.use((req, res, next) => {
    req.meta = {};
    next();
  });

  router.use('/users', userController.router);
  router.use('/tweets', tweetsController.router);

  return router;
};
