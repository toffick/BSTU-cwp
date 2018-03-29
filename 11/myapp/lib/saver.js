const Promise = require('bluebird');
const fs = require('fs');

class Saver {

    constructor(items, path){
        this.items = items;
        this.path = path;
    }

    async saver(){
        while (true) {
            await this.writeFilmsToFile();
        }
    };

    writeFilmsToFile(){
        return new Promise((resolve) =>{
            setTimeout(() =>{
                fs.writeFile(this.path, JSON.stringify(this.items,null,'\t'), (err) =>{
                    if (!err) resolve();
                });
            }, 1000);
        });
    };


}

module.exports = Saver;