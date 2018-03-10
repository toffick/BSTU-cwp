import winston from 'winston';

export default class LoggerService {
  constructor () {
    this.logger = new winston.Logger({
      transports: [
        new winston.transports.File({
          colorize: true,
          filename: './logs/log.log',
          json: false,
          level: 'info',
          maxsize: 512
        }),
        new winston.transports.Console({
          colorize: true,
          level: 'info',
          timestamp: true
        })
      ],
      exitOnError: false
    });
  }

  log (req, attachInfo) {
    if (attachInfo) {
      this.logger.info(`${req.originalUrl} ${req.method} ${attachInfo}\n`);
    } else {
      let query = this._getStringifyObjectIfNotEmpty('query object', req.query);
      let body = this._getStringifyObjectIfNotEmpty('body', req.body);

      this.logger.info(`${req.originalUrl} ${req.method}${query}${body}`);
    }
  };

  _getStringifyObjectIfNotEmpty (type, obj) {
    if (Object.keys(obj).length !== 0) {
      return `\n ${type} ${JSON.stringify(obj)}`;
    }

    return '';
  }
}
