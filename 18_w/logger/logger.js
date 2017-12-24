import { LOGLEVELS } from './log-levels.js';
import moment from 'moment';

export default class Logger {

    constructor(_prefix = 'kok',
                _defaultLevel = LOGLEVELS.LOG,
                _dateFormat = 'YYYY-MM-DD, H:m:s'){
        this.prefix = _prefix;
        this.defaultLevel = _defaultLevel;
        this.dateFormat = _dateFormat;
        this.LEVEL = LOGLEVELS;
        this.moment = moment;
    }

    static get LEVEL(){
        return LOGLEVELS;
    }

    format(message, level){
        return `${this.getFormattedDate()} | ${this.prefix} | ${level || this.defaultLevel} | ${message}`
    }

    getFormattedDate(){
        return this.moment().format(this.dateFormat)
    }

}