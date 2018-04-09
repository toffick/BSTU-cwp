'use strict';
var Mockgen = require('../../../mockgen.js');
const {ingestionService} = require('../../../../services')();

/**
 * Operations on /persons/{personId}/ingestions/{id}
 */
module.exports = {
  /**
   * summary: Get ingestion by id
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
      ingestionService.readChunk(req.query, {PersonId: req.params.personId, id: req.params.id}, true)
        .then(data => callback(null, {responses: data}))
        .catch(err => callback(err));
    },
    404: function (req, res, callback) {
      /**
       * Using mock data generator module.
       * Replace this by actual data for the api.
       */
      Mockgen().responses({
        path: '/persons/{personId}/ingestions/{id}',
        operation: 'get',
        response: '404'
      }, callback);
    },
    500: function (req, res, callback) {
      /**
       * Using mock data generator module.
       * Replace this by actual data for the api.
       */
      Mockgen().responses({
        path: '/persons/{personId}/ingestions/{id}',
        operation: 'get',
        response: '500'
      }, callback);
    }
  },
  /**
   * summary: Update ingestion
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
      ingestionService.update({PersonId: req.params.personId, id: req.params.id}, req.body)
        .then(data => callback(null, {responses: data}))
        .catch(err => callback(err));
    },
    500: function (req, res, callback) {
      /**
       * Using mock data generator module.
       * Replace this by actual data for the api.
       */
      Mockgen().responses({
        path: '/persons/{personId}/ingestions/{id}',
        operation: 'put',
        response: '500'
      }, callback);
    }
  },
  /**
   * summary: Delete ingestion
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
      ingestionService.delete({PersonId: req.params.personId, id: req.params.id})
        .then(data => callback(null, {responses:  {deletedCount: data}}))
        .catch(err => callback(err));
    },
    500: function (req, res, callback) {
      /**
       * Using mock data generator module.
       * Replace this by actual data for the api.
       */
      Mockgen().responses({
        path: '/persons/{personId}/ingestions/{id}',
        operation: 'delete',
        response: '500'
      }, callback);
    }
  }
};
