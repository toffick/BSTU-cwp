'use strict';
var Test = require('tape');
var Express = require('express');
var BodyParser = require('body-parser');
var Swaggerize = require('swaggerize-express');
var Path = require('path');
var Request = require('supertest');
var Mockgen = require('../../data/mockgen.js');
var Parser = require('swagger-parser');
/**
 * Test for /food/{id}
 */
Test('/food/{id}', function (t) {
  var apiPath = Path.resolve(__dirname, '../../config/swagger.yaml');
  var App = Express();
  App.use(BodyParser.json());
  App.use(BodyParser.urlencoded({
    extended: true
  }));
  App.use(Swaggerize({
    api: apiPath,
    handlers: Path.resolve(__dirname, '../../handlers')
  }));
  Parser.validate(apiPath, function (err, api) {
    t.error(err, 'No parse error');
    t.ok(api, 'Valid swagger api');
        /**
         * summary: Get food by id
         * description: 
         * parameters: id
         * produces: 
         * responses: 200, 404, 500
         */
    t.test('test  get operation', function (t) {
      Mockgen().requests({
        path: '/food/{id}',
        operation: 'get'
      }, function (err, mock) {
        var request;
        t.error(err);
        t.ok(mock);
        t.ok(mock.request);
                //Get the resolved path from mock request
                //Mock request Path templates({}) are resolved using path parameters
        request = Request(App)
                    .get('/api/v1' + mock.request.path);
        if (mock.request.body) {
                    //Send the request body
          request = request.send(mock.request.body);
        } else if (mock.request.formData){
                    //Send the request form data
          request = request.send(mock.request.formData);
                    //Set the Content-Type as application/x-www-form-urlencoded
          request = request.set('Content-Type', 'application/x-www-form-urlencoded');
        }
                // If headers are present, set the headers.
        if (mock.request.headers && mock.request.headers.length > 0) {
          Object.keys(mock.request.headers).forEach(function (headerName) {
            request = request.set(headerName, mock.request.headers[headerName]);
          });
        }
        request.end(function (err, res) {
          t.error(err, 'No error');
          t.ok(res.statusCode === 200, 'Ok response status');
          var Validator = require('is-my-json-valid');
          var validate = Validator(api.paths['/food/{id}']['get']['responses']['200']['schema']);
          var response = res.body;
          if (Object.keys(response).length <= 0) {
            response = res.text;
          }
          t.ok(validate(response), 'Valid response');
          t.error(validate.errors, 'No validation errors');
          t.end();
        });
      });
    });/**
         * summary: Update food
         * description: 
         * parameters: id, body
         * produces: 
         * responses: 200, 500
         */
    t.test('test  put operation', function (t) {
      Mockgen().requests({
        path: '/food/{id}',
        operation: 'put'
      }, function (err, mock) {
        var request;
        t.error(err);
        t.ok(mock);
        t.ok(mock.request);
                //Get the resolved path from mock request
                //Mock request Path templates({}) are resolved using path parameters
        request = Request(App)
                    .put('/api/v1' + mock.request.path);
        if (mock.request.body) {
                    //Send the request body
          request = request.send(mock.request.body);
        } else if (mock.request.formData){
                    //Send the request form data
          request = request.send(mock.request.formData);
                    //Set the Content-Type as application/x-www-form-urlencoded
          request = request.set('Content-Type', 'application/x-www-form-urlencoded');
        }
                // If headers are present, set the headers.
        if (mock.request.headers && mock.request.headers.length > 0) {
          Object.keys(mock.request.headers).forEach(function (headerName) {
            request = request.set(headerName, mock.request.headers[headerName]);
          });
        }
        request.end(function (err, res) {
          t.error(err, 'No error');
          t.ok(res.statusCode === 200, 'Ok response status');
          var Validator = require('is-my-json-valid');
          var validate = Validator(api.paths['/food/{id}']['put']['responses']['200']['schema']);
          var response = res.body;
          if (Object.keys(response).length <= 0) {
            response = res.text;
          }
          t.ok(validate(response), 'Valid response');
          t.error(validate.errors, 'No validation errors');
          t.end();
        });
      });
    });/**
         * summary: Delete food
         * description: 
         * parameters: id
         * produces: 
         * responses: 200, 500
         */
    t.test('test  delete operation', function (t) {
      Mockgen().requests({
        path: '/food/{id}',
        operation: 'delete'
      }, function (err, mock) {
        var request;
        t.error(err);
        t.ok(mock);
        t.ok(mock.request);
                //Get the resolved path from mock request
                //Mock request Path templates({}) are resolved using path parameters
        request = Request(App)
                    .delete('/api/v1' + mock.request.path);
        if (mock.request.body) {
                    //Send the request body
          request = request.send(mock.request.body);
        } else if (mock.request.formData){
                    //Send the request form data
          request = request.send(mock.request.formData);
                    //Set the Content-Type as application/x-www-form-urlencoded
          request = request.set('Content-Type', 'application/x-www-form-urlencoded');
        }
                // If headers are present, set the headers.
        if (mock.request.headers && mock.request.headers.length > 0) {
          Object.keys(mock.request.headers).forEach(function (headerName) {
            request = request.set(headerName, mock.request.headers[headerName]);
          });
        }
        request.end(function (err, res) {
          t.error(err, 'No error');
          t.ok(res.statusCode === 200, 'Ok response status');
          var Validator = require('is-my-json-valid');
          var validate = Validator(api.paths['/food/{id}']['delete']['responses']['200']['schema']);
          var response = res.body;
          if (Object.keys(response).length <= 0) {
            response = res.text;
          }
          t.ok(validate(response), 'Valid response');
          t.error(validate.errors, 'No validation errors');
          t.end();
        });
      });
    });
  });
});
