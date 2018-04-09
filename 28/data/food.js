'use strict';
var Mockgen = require('./mockgen.js');

const {foodService} = require('../services')();

/**
 * Operations on /food
 */
module.exports = {
  /**
   * summary: Get food
   * description:
   * parameters: limit, offset
   * produces:
   * responses: 200, 500
   * operationId:
   */
  get: {
    200: function (req, res, callback) {
      /**
       * Using mock data generator module.
       * Replace this by actual data for the api.
       */
      foodService.readChunk(req.query)
        .then(data => callback(null, {responses: data}))
        .catch(err => callback(err));

    },
    500: function (req, res, callback) {
      /**
       * Using mock data generator module.
       * Replace this by actual data for the api.
       */
      Mockgen().responses({
        path: '/food',
        operation: 'get',
        response: '500'
      }, callback);
    }
  },
  /**
   * summary: Create food
   * description:
   * parameters: body
   * produces:
   * responses: 201, 409, 500
   * operationId:
   */
  post: {
    201: function (req, res, callback) {
      /**
       * Using mock data generator module.
       * Replace this by actual data for the api.
       */
      foodService.create(req.body)
        .then(data=>callback(null, {responses: data}))
        .catch(err=>callback(err));
    },
    409: function (req, res, callback) {
      /**
       * Using mock data generator module.
       * Replace this by actual data for the api.
       */
      Mockgen().responses({
        path: '/food',
        operation: 'post',
        response: '409'
      }, callback);
    },
    500: function (req, res, callback) {
      /**
       * Using mock data generator module.
       * Replace this by actual data for the api.
       */
      Mockgen().responses({
        path: '/food',
        operation: 'post',
        response: '500'
      }, callback);
    }
  }
};
