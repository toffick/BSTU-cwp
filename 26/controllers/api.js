import {Router} from 'express';

module.exports = ({
  userController,
  teamController
}) => {
  const router = Router();

  router.use('/user', userController.router);
  router.use('/team', teamController.router);

  return router;
};
