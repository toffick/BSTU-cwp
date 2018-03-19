import {normalizeLimit} from '../helpers/paginator.helper';
import validator from '../../helpers/validator.helper';
import {parseQueryItem} from '../helpers/query.helper';

export default ({tweetsQuerySchema, errors}) => async (req, res, next) => {
  const {order, page, limit, filter} = req.query;

  const query = {};

  query.orders = parseQueryItem(order, tweetsQuerySchema.order) || [];
  query.filters = parseQueryItem(filter, tweetsQuerySchema.filter) || [];
  query.limit = normalizeLimit(limit);
  query.page = page || 1;

  let validCheck = validator(tweetsQuerySchema.meta, query);
  if (!validCheck.isValid) {
    next(errors.validError(validCheck.errors));
  }

  req.meta.query = query;

  next();
};
