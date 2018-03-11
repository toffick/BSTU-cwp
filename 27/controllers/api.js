import {Router} from 'express';

module.exports = ({
  userController
}) => {
  const router = Router();

  // router.use('/user', userController.router);

  return router;
};
