'use strict';
var Mockgen = require('./mockgen.js');
const {personService} = require('../services')();
/**
 * Operations on /persons
 */
module.exports = {
  /**
   * summary: Get persons
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
      personService.readChunk(req.query)
        .then(data => callback(null, {responses: data}))
        .catch(err => callback(err));
    },
    500: function (req, res, callback) {
      /**
       * Using mock data generator module.
       * Replace this by actual data for the api.
       */
      Mockgen().responses({
        path: '/persons',
        operation: 'get',
        response: '500'
      }, callback);
    }
  },
  /**
   * summary: Create person
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
     personService.create(req.body)
       .then(data => callback(null, {responses: data}))
       .catch(err => callback(err));
    },
    409: function (req, res, callback) {
      /**
       * Using mock data generator module.
       * Replace this by actual data for the api.
       */
      Mockgen().responses({
        path: '/persons',
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
        path: '/persons',
        operation: 'post',
        response: '500'
      }, callback);
    }
  }
};
