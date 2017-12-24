const fs = require('fs');

const Logger = function Logger() {
};

Logger.prototype.sendLogs = function (req, res, data, cb) {
    fs.readFile('./log.json', function (err, data) {
        cb(null, JSON.parse(data));
    });
};

exports.Logger = Logger;
