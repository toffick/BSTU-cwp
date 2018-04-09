'use strict';
var Mockgen = require('./mockgen.js');
const {agentService} = require('../services')();
/**
 * Operations on /agents
 */
module.exports = {
  /**
   * summary: Get agents
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
      agentService.readChunk(req.query)
        .then(data => callback(null, {responses: data}))
        .catch(err => callback(err));

    },
    500: function (req, res, callback) {
      /**
       * Using mock data generator module.
       * Replace this by actual data for the api.
       */
      Mockgen().responses({
        path: '/agents',
        operation: 'get',
        response: '500'
      }, callback);
    }
  },
  /**
   * summary: Create agent
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
      agentService.create(req.body)
        .then(data => callback(null, {responses: data}))
        .catch(err => callback(err));

    },
    409: function (req, res, callback) {
      /**
       * Using mock data generator module.
       * Replace this by actual data for the api.
       */
      Mockgen().responses({
        path: '/agents',
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
        path: '/agents',
        operation: 'post',
        response: '500'
      }, callback);
    }
  }
};
