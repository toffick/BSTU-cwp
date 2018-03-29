let articles = require("../content/articles.json");
const valid = require('../lib/valid');
const error = require('../lib/error-sending');
const uniqid = require('uniqid');
const addserv = require('../additional-services');


const Articles = function Articles() {
};

Articles.prototype.readAll = function (req, res, data, cb) {
    cb(null, articles);
};
Articles.prototype.read = function (req, res, data, cb) {
    if (valid.isValidId(data)) {
        let result = articles.find(x => x.id === data.id);
        if (result) {
            cb(null, result);
            return;
        }
    }
    else {
        error.requestInvalidError(req, res, data,cb);
        return;
    }
    error.articleNotFoundError(req, res, data,cb);
};
Articles.prototype.create = function (req, res, data, cb) {
    if (valid.isValidArticle(data)) {
        data.id = uniqid();
        data.comments = [];
        articles.push(data);
        cb(null, data);
        addserv.saveArticles(articles);
    }
    else {
        error.requestInvalidError(req, res, data,cb);
    }

};
Articles.prototype.update = function (req, res, data, cb) {
    if (valid.isValidId(data) && valid.isValidArticle(data)) {
        for (i = 0; i < articles.length; i++) {
            if (articles[i].id === data.id) {
                articles[i] = data;
                cb(null, {"msg": "update success"});
                addserv.saveArticles(articles);
                return;
            }
        }
    } else {
        error.requestInvalidError(req, res, data,cb);
        return;
    }
    error.articleNotFoundError(req, res, data,cb);
};
Articles.prototype.delete = function (req, res, data, cb) {
    if (valid.isValidId(data)) {
        let index = articles.findIndex(x => x.id === data.id);
        if (index !== -1) {
            articles.splice(index, 1);
            cb(null, {"msg": "article delete success"});
            addserv.saveArticles(articles);
            return;
        }
    }
    else {
        error.requestInvalidError(req, res, data,cb);
        return;
    }
    error.articleNotFoundError(req, res, data,cb);
};

exports.Articles = Articles;

