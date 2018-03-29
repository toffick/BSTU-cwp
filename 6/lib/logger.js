const fs = require('fs');

exports.writeToLog = function (url, body) {

    let today = new Date();
    let logRecord = {
        date: today.toLocaleTimeString() + ' ' + today.toLocaleDateString(),
        url : url,
        body : body
    };

    fs.readFile('./log.json', function (err, data) {
        let json = JSON.parse(data);
        json.push(logRecord);
        fs.writeFile('./log.json', JSON.stringify(json));
    });
};

exports.createLog = function(){
    if(!fs.existsSync('./log.json'))
        fs.writeFile('./log.json','[]',(err)=>{
            if(err) console.error(err);
        });
};