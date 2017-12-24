import Logger from './logger'
import fs from 'fs';

export default class FileLogger extends Logger {
    constructor(_file, _prefix, _defaultLevel, _dateFormat){
        super(_prefix, _defaultLevel, _dateFormat);
        if (typeof _file === 'string') {
            this.file = fs.createWriteStream(_file);
        }
        else
            this.file = _file;
    }

    format(message, level){
        return `${super.getFormattedDate()} | ${this.prefix} | ${this.defaultLevel} | ${message}\n`
    }

    log(message, level = this.defaultLevel){
        return this.file.write(this.format(message, level));
    }

    close(){
        this.file.end();
    }
}
