const express = require('express');

express.response.error = function(error) {
    if (!error.code) {
        error = {
            message: error.toString(),
            code: 'server_error',
            status: 500
        };
    }

    this.status(error.status).json(error);
};

module.exports = {
    invalidId: {
        message: 'Invalid ID',
        code: 'invalid_id',
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
    emptyData:{
        message: 'Empty input data',
        code: 'empty_data',
        status: 400
    },
    validError: (msg)=>{
        return {
            message: msg,
            code: 'validate_error',
            status: 400
        }
    }
};