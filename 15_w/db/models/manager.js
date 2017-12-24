const bcrypt = require('bcryptjs');

module.exports = (sequelize, connection) =>{
    return connection.define('managers', {
        id: {
            type: sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: sequelize.STRING,
            allowNull: false
        },
        super: {
            type: sequelize.BOOLEAN,
            allowNull: false
        }
    }, {
        hooks: {
            beforeCreate: (manager, options) =>{
                return bcrypt.genSalt(11)
                    .then(function (salt){
                        return bcrypt.hash(manager.password, salt);
                    }).then(function (hash){
                        manager.password = hash;
                    });
            }
        }
    });
}