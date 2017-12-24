module.exports = (sequelize, connection) =>{
    return connection.define('motions', {
        id: {
            type: sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        latitude: {
            type: sequelize.DOUBLE,
            allowNull: false
        },
        longitude: {
            type: sequelize.DOUBLE,
            allowNull: false
        },
        time: {
            type: sequelize.DATE,
            allowNull: false
        }
    }, {
        getterMethods: {
            latLng: function (){
                return {
                    latitude: this.latitude,
                    longitude: this.longitude
                };
            }
        }
    });
};

//TODO там какое-то фейковое поле/ в доках есть, ептыль/ в лекции есть ептыль!1