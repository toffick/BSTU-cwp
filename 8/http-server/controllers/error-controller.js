const errorsMsg = require('../content/errors.json');

export default class Error {
    SetNotFoundError(payload, cb) {
        cb(errorsMsg.article_not_found, null);
    };

    SetRequestInvalidError(payload, cb) {
        cb(errorsMsg.article_not_found, null);
    };
}

