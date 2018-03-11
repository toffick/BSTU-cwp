export default ({loggerService}) => (req, res, next) => {
  loggerService.log(req);

  next();
};
