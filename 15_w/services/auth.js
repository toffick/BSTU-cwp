const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendResponse = require('./sendResponse');

class Auth {

    constructor(repo, secretKey){
        this.model = repo;
        this.sercretKey = secretKey;
        this.tokenExpiresIn = "55m";
    }

    async register(res, body){
        try {
            let data = await this.model.create(body);
            return sendResponse(res, 200, data);
        }
        catch (err) {
            return sendResponse(res, 400, "Bad register data");
        }
    }

    async login(res, email, password){
        let user = await this.isAccountExist(email, password);
        if (user) {
            let token = jwt.sign(
                {id: user.id, email},
                this.sercretKey,
                {expiresIn: this.tokenExpiresIn});
            return sendResponse(res, 200, token);
        }
        return sendResponse(res, 409, "Wrong login or password");

    }

    async isAccountExist(email, password){
        let user = await this.model.find({where: {email}});
        if (user) {
            if (await bcrypt.compare(password, user.get({raw: true}).password))
                return user;
        }
        return;
    }

    async verifyToken(token){
        try {
            return await jwt.verify(token, this.sercretKey);
        } catch (err) {
            return;
        }
    }

    async getManagerById(id){
        return await this.model.find({where: {id}});
    }
}

module.exports = Auth;