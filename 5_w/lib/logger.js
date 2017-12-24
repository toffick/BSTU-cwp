const fs = require('fs');

exports.writeToLog = function (url, body) {
    let logRecord = {};
    let today = new Date();

    logRecord.date = today.toLocaleTimeString() + ' ' + today.toLocaleDateString();
    logRecord.url = url;
    logRecord.body = body;

    fs.appendFile('./log.log', JSON.stringify(logRecord), (err) => {
        if (err)
            console.error(err);
    })
};

exports.sendLogs = function (req, res, data, cb) {
    fs.readFile('./log.log', function (err, data) {
        cb(null, JSON.parse(data));
    });
};