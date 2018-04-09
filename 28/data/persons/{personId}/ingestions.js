'use strict';
var Mockgen = require('../../mockgen.js');
const {ingestionService} = require('../../../services')();

/**
 * Operations on /persons/{personId}/ingestions
 */
module.exports = {
  /**
   * summary: Get ingestions
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
       * Replace this by actual data for the
       * api.
       */
      ingestionService.readChunk(req.query, {PersonId: req.params.personId})
        .then(data => callback(null, {responses: data}))
        .catch(err => callback(err));
    },
    500: function (req, res, callback) {
      /**
       * Using mock data generator module.
       * Replace this by actual data for the api.
       */
      Mockgen().responses({
        path: '/persons/{personId}/ingestions',
        operation: 'get',
        response: '500'
      }, callback);
    }
  },
  /**
   * summary: Create ingestion
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
      const data = {};
      data.PersonId = req.params.personId;
      data.FoodId = req.body.foodId;
      data.AgentId = req.body.reportedById;
      data.when = req.body.when;
      ingestionService.create(data)
        .then(data => callback(null, {responses: data}))
        .catch(err => callback(err));
    },
    409: function (req, res, callback) {
      /**
       * Using mock data generator module.
       * Replace this by actual data for the api.
       */
      Mockgen().responses({
        path: '/persons/{personId}/ingestions',
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
        path: '/persons/{personId}/ingestions',
        operation: 'post',
        response: '500'
      }, callback);
    }
  }
};
