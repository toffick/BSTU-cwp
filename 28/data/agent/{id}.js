'use strict';
var Mockgen = require('../mockgen.js');
const {agentService} = require('../../services')();

/**
 * Operations on /agent/{id}
 */
module.exports = {
  /**
   * summary: Get agent by id
   * description:
   * parameters: id
   * produces:
   * responses: 200, 404, 500
   * operationId:
   */
  get: {
    200: function (req, res, callback) {
      /**
       * Using mock data generator module.
       * Replace this by actual data for the api.
       */
   agentService.read(req.params.id)
     .then(data => callback(null, {responses: data}))
     .catch(err => callback(err));

    },
    404: function (req, res, callback) {
      /**
       * Using mock data generator module.
       * Replace this by actual data for the api.
       */
      callback(null, {response: {error: 404}})
    },
    500: function (req, res, callback) {
      /**
       * Using mock data generator module.
       * Replace this by actual data for the api.
       */
      Mockgen().responses({
        path: '/agent/{id}',
        operation: 'get',
        response: '500'
      }, callback);
    }
  },
  /**
   * summary: Update agent
   * description:
   * parameters: id, body
   * produces:
   * responses: 200, 500
   * operationId:
   */
  put: {
    200: function (req, res, callback) {
      /**
       * Using mock data generator module.
       * Replace this by actual data for the api.
       */
      agentService.update(req.params.id, req.body)
          .then(data => callback(null, {responses: data}))
          .catch(err => callback(err));

    },
    500: function (req, res, callback) {
      /**
       * Using mock data generator module.
       * Replace this by actual data for the api.
       */
      Mockgen().responses({
        path: '/agent/{id}',
        operation: 'put',
        response: '500'
      }, callback);
    }
  },
  /**
   * summary: Delete agent
   * description:
   * parameters: id
   * produces:
   * responses: 200, 500
   * operationId:
   */
  delete: {
    200: function (req, res, callback) {
      /**
       * Using mock data generator module.
       * Replace this by actual data for the api.
       */
      agentService.delete(req.params.id)
        .then(data => callback(null, {responses: {deletedCount: data}}))
        .catch(err => callback(err));

    },
    500: function (req, res, callback) {
      /**
       * Using mock data generator module.
       * Replace this by actual data for the api.
       */
      Mockgen().responses({
        path: '/agent/{id}',
        operation: 'delete',
        response: '500'
      }, callback);
    }
  }
};
