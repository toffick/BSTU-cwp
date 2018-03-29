module.exports = (sequelize, connection) =>{
    return connection.define('countrylanguage', {
        CountryCode: {
            type: sequelize.STRING(3),
            primaryKey: true,
            allowNull: false,
            defaultValue: ''
        },
        Language: {
            type: sequelize.STRING(35),
            primaryKey: true,
            allowNull: false,
            defaultValue: ''
        },
        IsOfficial: {
            type: sequelize.ENUM('T','F'),
            allowNull: false,
            defaultValue: 'F'
        },
        Percentage: {
            type: sequelize.FLOAT(4,1),
            allowNull: false,
            defaultValue: 0.0
        },
        Language: {
            type: sequelize.STRING(35),
            allowNull: false,
            defaultValue: ''
        }
    });
};