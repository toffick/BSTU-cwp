module.exports = (sequelize, connection) =>{
    return connection.define('actors', {
        name: {
            type: sequelize.STRING(500),
            allowNull: false
        },
        birth: {
            type: sequelize.DATE,
            allowNull: false
        },
        filmsNumber: {
            type: sequelize.INTEGER,
            allowNull: false
        },
        liked: {
            type: sequelize.INTEGER,
            allowNull: false
        },
        photo: {
            type: sequelize.STRING(500),
            allowNull: false
        }
    }, {
        hooks: {
            beforeCreate: function (user, options){
                user.photo ='no photo';
            },
            afterCreate: function (user, options){
                console.log(`${user} was successful created`);
            }
        }
    });
};

