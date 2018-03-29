const errors = require("../content/errors.json");

exports.articleNotFoundError = function (req, res, payload, cb) {
    cb(errors.article_not_found, null);
};


exports.pageNotFoundError = function (req, res, payload, cb) {
    cb(errors.not_found, null);
};


exports.requestInvalidError = function (req, res, payload, cb) {
    cb(errors.request_invalid, null);
};

