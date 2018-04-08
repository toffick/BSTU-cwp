const LRU = require("lru-cache");

class CacheService {

    constructor() {
        this.cache = LRU({
            max: 5,
            maxAge: 1000 * 5
        })
    }

    async set(req, data) {
        this.cache.set(`${req.method}${req.originalUrl}`, data);
    }

    async get(req) {
        return this.cache.get(`${req.method}${req.originalUrl}`);
    }
}

module.exports = CacheService;
