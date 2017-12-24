const errors = require("../content/errors.json");

const Errors = function Errors() {
};

Errors.prototype.articleNotFoundError = function (req, res, payload, cb) {
    cb(errors.article_not_found, null);
};

Errors.prototype.pageNotFoundError = function (req, res, payload, cb) {
    cb(errors.not_found, null);
};


Errors.prototype.requestInvalidError = function (req, res, payload, cb) {
    cb(errors.request_invalid, null);
};

exports.Errors = Errors;