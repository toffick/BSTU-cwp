'use strict';
var dataProvider = require('../../data/food/{id}.js');
/**
 * Operations on /food/{id}
 */
module.exports = {
    /**
     * summary: Get food by id
     * description: 
     * parameters: id
     * produces: 
     * responses: 200, 404, 500
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
     * summary: Update food
     * description: 
     * parameters: id, body
     * produces: 
     * responses: 200, 500
     */
  put: function (req, res, next) {
        /**
         * Get the data for response 200
         * For response `default` status 200 is used.
         */
    var status = 200;
    var provider = dataProvider['put']['200'];
    provider(req, res, function (err, data) {
      if (err) {
        next(err);
        return;
      }
      res.status(status).send(data && data.responses);
    });
  },
    /**
     * summary: Delete food
     * description: 
     * parameters: id
     * produces: 
     * responses: 200, 500
     */
  delete: function (req, res, next) {
        /**
         * Get the data for response 200
         * For response `default` status 200 is used.
         */
    var status = 200;
    var provider = dataProvider['delete']['200'];
    provider(req, res, function (err, data) {
      if (err) {
        next(err);
        return;
      }
      res.status(status).send(data && data.responses);
    });
  }
};
