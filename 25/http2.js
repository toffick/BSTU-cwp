const http2 = require('http2');
const fs = require('fs');
const path = require('path');
const mime = require('mime');
const url = require('url');
const helpers = require('./helpers.js');

const key = fs.readFileSync('14076904_localhost_3008.key');
const cert = fs.readFileSync('14076904_localhost_3008.cert');

const statisDir = './public';
const {HTTP2_HEADER_PATH} = http2.constants;

const server = http2.createSecureServer(
    {key, cert},
    onRequest
);

function onRequest(req, res) {
    sendFile(req.stream, url.parse(req.headers[':path']).pathname);
}

function sendFile(stream, filePath) {
    const fullResourcePath = path.join(statisDir, filePath);

    if (filePath === '/index.html') {
        push(stream, 'site.css');
        push(stream, 'app.js');
    }

    function onError(err) {
        if (err.code === 'ENOENT') {
            stream.respond({':status': 404});
        } else {
            stream.respond({':status': 500});
        }
        stream.end();
    }

    stream.respondWithFile(fullResourcePath,
        {'content-type': mime.getType(filePath)},
        {onError});
}

function push(stream, filePath) {
    const fullResourcePath = path.join(statisDir, filePath);
    const {descriptor, headers} = helpers.getFileInfo(fullResourcePath);
    const pushHeaders = {[HTTP2_HEADER_PATH]: '/' + filePath};

    stream.pushStream(pushHeaders, (err, pushStream) => {
        pushStream.respondWithFD(descriptor, headers)
    });
}

server.listen(8443);
