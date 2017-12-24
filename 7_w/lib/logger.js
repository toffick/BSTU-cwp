const fs = require('fs');
const LOG_PATH = './log.json';

exports.writeToLog = function (url, body) {

    let today = new Date();
    let logRecord = {
        date: today.toLocaleTimeString() + ' ' + today.toLocaleDateString(),
        url : url,
        body : body
    };

    fs.readFile(LOG_PATH, function (err, data) {
        let json = JSON.parse(data);
        json.push(logRecord);
        fs.writeFile(LOG_PATH, JSON.stringify(json));
    });
};

exports.createLog = function(){
    if(!fs.existsSync(LOG_PATH))
        fs.writeFile(LOG_PATH,'[]',(err)=>{
            if(err) console.error(err);
        });
};