import Logger from './logger'

export default class ConsoleLogger extends Logger {
    constructor(_prefix, _defaultLevel, _dateFormat){
        super(_prefix, _defaultLevel, _dateFormat);
    }

    format(message, level){
        return `${super.getFormattedDate()} | ${this.prefix} | ${message}`
    }

    log(message, level){
        let logMethod = console.hasOwnProperty(level) ? level : this.defaultLevel;
        console[logMethod](this.format(message, level));
    }
}