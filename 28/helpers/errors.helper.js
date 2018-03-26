const express = require('express');
express.response.error = function (error) {
  // TODO remove me pls))
  console.log(error);
  console.log(2);
  if (!error.code) {
    error = {
      message: error.toString(),
      code: 'server_error',
      status: 500
    };
  }

  this.status(error.status).json(error);
};

module.exports =  {
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
  soManyRows: {
    message: 'More than one record was found for the request',
    code: 'so_many_rows',
    status: 408
  },
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
    }),
  custom: (message, code, status) => ({
    message,
    code,
    status
  })
};
