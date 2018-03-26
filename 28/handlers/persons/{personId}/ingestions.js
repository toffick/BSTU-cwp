'use strict';
var dataProvider = require('../../../data/persons/{personId}/ingestions.js');
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
     */
  get: function (req, res, next) {
        /**
         * Get the data for response 200
         * For response `default` status 200 is used.
         */
    var status = 200;
    var provider = dataProvider['get']['200'];
    provider(req, res, function (err, data) {
      if (err) {
        next(err);
        return;
      }
      res.status(status).send(data && data.responses);
    });
  },
    /**
     * summary: Create ingestion
     * description: 
     * parameters: body
     * produces: 
     * responses: 201, 409, 500
     */
  post: function (req, res, next) {
        /**
         * Get the data for response 201
         * For response `default` status 200 is used.
         */
    var status = 201;
    var provider = dataProvider['post']['201'];
    provider(req, res, function (err, data) {
      if (err) {
        next(err);
        return;
      }
      res.status(status).send(data && data.responses);
    });
  }
};
