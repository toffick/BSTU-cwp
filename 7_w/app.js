const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const com = require("./controllers/Comments");
const art = require("./controllers/Articles");
const logcontroller = require("./controllers/Logger");
const err = require('./controllers/Errors');
const logger = require('./lib/logger');
let articles = require("./content/articles.json");

const STATIC_DIR = '/public';
const HANDLER_STATIC_STATUS = 'ST';
const DIRNAME = __dirname;

const hostname = '127.0.0.1';
const port = 3000;

let controllers = {
    comments: new com.Comments(),
    articles: new art.Articles(),
    log: new logcontroller.Logger(),
    errors: new err.Errors()
};

const handlers = {
    '/api/articles/readall': controllers.articles.readAll,
    '/api/articles/read': controllers.articles.read,
    '/api/articles/create': controllers.articles.create,
    '/api/articles/update': controllers.articles.update,
    '/api/articles/delete': controllers.articles.delete,
    '/api/comments/create': controllers.comments.create,
    '/api/comments/delete': controllers.comments.delete,
    '/api/logs': controllers.log.sendLogs
};

const contentTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.jpg': 'image/jpeg'
};

const server = http.createServer((req, res) => {

    const handler = getHandler(req.url);

    if (handler === HANDLER_STATIC_STATUS)
        getStatic(req, function (data, contentType, statusCode) {
            res.setHeader('Content-Type', contentType);
            res.statusCode = statusCode;
            res.end(data);
        });
    else
        parseBodyJson(req, (err, payload) => {
            if (err) {
                res.statusCode = err.code;
                res.end(JSON.stringify(err));
            }
            else {
                logger.writeToLog(req.url, payload);
                handler(req, res, payload, (err, result) => {
                    res.setHeader('Content-Type', 'application/json');
                    if (err) {
                        res.statusCode = err.code;
                        res.end(JSON.stringify(err));
                    } else {
                        res.statusCode = 200;
                        res.end(JSON.stringify(result));
                    }
                });
            }
        });
});

server.listen(port, hostname, () => {
    logger.createLog();
    console.log(`Server running at http://${hostname}:${port}/`);
});

function getHandler(url) {
    return handlers[url] || HANDLER_STATIC_STATUS;
}

function parseBodyJson(req, cb) {
    let body = [];
    req.on('data', function (chunk) {
        body.push(chunk);
    }).on('end', function () {
        body = Buffer.concat(body).toString();
        if (body !== "") {
            try {
                params = JSON.parse(body);
                cb(null, params);
            } catch (e) {
                console.log(e);
                controllers.errors.requestInvalidError(req, null, null, cb);
            }
        }
        else {
            controllers.errors.requestInvalidError(req, null, null, cb);
        }
    });
}

function getStatic(req, cb) {

    let pathname = DIRNAME + STATIC_DIR + url.parse(req.url).pathname;
    if (pathname === DIRNAME + STATIC_DIR + '/')
        pathname = DIRNAME + STATIC_DIR + '/index.html';

    let ext = path.extname(pathname);
    fs.readFile(pathname, (err, data) => {
        if (err)
            cb(`Error getting the file: ${err}`, 'text/plain', 404);
        else
            cb(data, getContentType(ext), 200);
    })
}

function getContentType(ext) {
    return contentTypes[ext] || 'text/plain';
}

