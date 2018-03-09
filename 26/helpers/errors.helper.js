import express from 'express';

express.response.error = function (error) {
  if (!error.code) {
    error = {
      message: error.toString(),
      code: 'server_error',
      status: 500
    };
  }

  this.status(error.status).json(error);
};

export default {
  invalidId: {
    message: 'Invalid ID',
    code: 'invalid_id',
    status: 400
  },
  nonValidated: {
    message: 'user did not validated',
    code: 'user_non_validated',
    status: 403
  },
  userIsNotFound: (id) => ({
    message: `the user with id ${id} is not in this team`,
    code: 'user_not_in_team',
    status: 404
  }),
  userDoesNotWork: (id) => ({
    message: `the user with id ${id} doesn't work by schedule now`,
    code: 'user_does_not_work',
    status: 408
  }),
  invalidToken: {
    message: 'Invalid user token',
    code: 'invalid_token',
    status: 400
  },
  notFound: {
    message: 'Entity not found',
    code: 'entity_not_found',
    status: 404
  },
  wrongCredentials: {
    message: 'Email or password are wrong',
    code: 'wrong_credentials',
    status: 404
  },
  accessDenied: {
    message: 'Access denied',
    code: 'access_denied',
    status: 403
  },
  invalidData: {
    message: 'Invalid input data',
    code: 'validate_error',
    status: 400
  },
  emptyData: {
    message: 'Empty input data',
    code: 'empty_data',
    status: 400
  },
  validError: (msg) =>
    ({
      message: msg,
      code: 'validate_error',
      status: 400
    })
};
