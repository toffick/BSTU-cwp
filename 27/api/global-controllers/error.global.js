export default () => (error, req, res, next) => {
  res.error(error);
};
