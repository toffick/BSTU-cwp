let articles = require("../content/articles.json");
const valid = require('../lib/valid');
const err = require('./Errors');
const uniqid = require('uniqid');
const addserv = require('../additional-services');

let error =  new err.Errors();

const Comments = function Comments() {
};

Comments.prototype.create = function (req, res, data, cb) {
    if (valid.isValidId(data) && valid.isValidComment(data)) {
        let index = articles.findIndex(x => x.id === data.articleId);
        if (index !== -1) {
            data.id = uniqid();
            data.date = Date.now();
            articles[index].comments.push(data);
            cb(null, data);
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
Comments.prototype.delete = function (req, res, data, cb) {
    if (valid.isValidId(data)) {
        for (i = 0; i < articles.length; i++) {
            for (j = 0; j < articles[i].comments.length; j++) {
                if (data.id === articles[i].comments[j].id) {
                    articles[i].comments.splice(j, 1);
                    cb(null, {"msg": "comment delete success"});
                    addserv.saveArticles(articles);
                    return;
                }
            }
        }
    } else {
        error.requestInvalidError(req, res, data, cb);
        return;
    }
    error.articleNotFoundError(req, res, data, cb);
};

exports.Comments = Comments;