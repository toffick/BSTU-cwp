let articles = require("../content/articles.json");
const valid = require('../lib/valid');
const err = require('./Errors');
const uniqid = require('uniqid');
const addserv = require('../additional-services');
const sorting = require('../lib/sorting');

let error = new err.Errors();

const Articles = function Articles() {
};

Articles.prototype.readAll = function (req, res, data, cb) {

    let meta = getMeta(data);
    let sortedArticles = sorting.sort(articles, meta.sorting.order, meta.sorting.field);
    let pagginedArticles = sortedArticles.slice(
        (meta.pagination.page - 1) * meta.pagination.limit,
        (meta.pagination.page - 1) * meta.pagination.limit + meta.pagination.limit);

    if (meta.includeDeps) {
        pagginedArticles = pagginedArticles.map((val) => {
            let obj = Object.assign({}, val);
            delete obj.comments;
            return obj;
        });
    }

    cb(null, {titles: pagginedArticles, meta: meta});
};

function getMeta(data) {
    return {
        sorting: {
            field: data.sortField || "date",
            order: data.sortOrder || "desc"
        },
        pagination: {
            page: data.page || 1,
            limit: data.limit || 10,
            pages: Math.ceil(articles.length / (data.limit || 10)),
            count: articles.length
        },
        includeDeps: data.includeDeps || false
    }
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
        error.requestInvalidError(req, res, data, cb);
        return;
    }
    error.articleNotFoundError(req, res, data, cb);
};
Articles.prototype.create = function (req, res, data, cb) {
    if (valid.isValidArticle(data)) {
        data.id = uniqid();
        data.comments = [];
        data.date = Date.now();

        articles.push(data);
        cb(null, data);
        addserv.saveArticles(articles);
    }
    else {
        error.requestInvalidError(req, res, data, cb);
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
        error.requestInvalidError(req, res, data, cb);
        return;
    }
    error.articleNotFoundError(req, res, data, cb);
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
        error.requestInvalidError(req, res, data, cb);
        return;
    }
    error.articleNotFoundError(req, res, data, cb);
};

exports.Articles = Articles;

