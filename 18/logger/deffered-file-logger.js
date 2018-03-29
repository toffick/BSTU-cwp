import FileLogger from './file-logger'

export default class DeferredFileLogger extends FileLogger {

    constructor(_file, _queueLength, _prefix, _defaultLevel, _dateFormat){
        super(_file, _prefix, _defaultLevel, _dateFormat);
        this.queueLength = _queueLength;
        this.messagesQueue = [];
    }

    format(message, level){
        return `${super.getFormattedDate()} | ${this.prefix} | ${this.defaultLevel} | ${message}\n`
    }

    log(message, level = this.defaultLevel){
        return new Promise((resolve, reject) =>{
            this.messagesQueue.push(this.format(message, level));
            if (this.messagesQueue.length === this.queueLength) {
                this.messagesQueue.forEach(async (item) =>{
                    try {
                        await this.file.write(item);
                    } catch (err) {
                        resolve(err);
                    }
                });
                this.messagesQueue = [];
            }
            resolve(true);
        });
    }

    close(){
        this.file.end();
    }
}
