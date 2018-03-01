const http = require('http');
const fs = require('fs');
const path = require('path');

const createRequest = (enc) => {
    const requestOptions = {
        host: 'localhost',
        path: '/app.js',
        port: 3000,
        method: 'GET',
        headers: {
            'Accept-Encoding': enc
        }
    };

    if (!enc) {
        delete requestOptions.headers;
    }

    const request = http.request(requestOptions);
    request.end();

    request.on('response', writeRequestToFile('./download', enc + '.js'));
};

const writeRequestToFile = (dirPath, fileName) => {
    const writeStream = fs.createWriteStream(path.join(dirPath, fileName));
    return (response) => {
        response.pipe(writeStream);
    }
};

[
    '',
    'gzip',
    'deflate',
    'br'
].forEach((encoding) => createRequest(encoding));

