module.exports = (sequelize, connection) =>{
    return connection.define('country', {
        Code: {
            type: sequelize.STRING(3),
            primaryKey: true,
            allowNull: false,
            defaultValue: ''
        },
        Name: {
            type: sequelize.STRING(52),
            allowNull: false,
            defaultValue: ''
        },
        Continent: {
            type: sequelize.ENUM('Asia','Europe','North America','Africa','Oceania','Antarctica','South America'),
            allowNull: false,
            defaultValue: 'Asia'
        },
        Region: {
            type: sequelize.STRING(26),
            allowNull: false,
            defaultValue: ''
        },
        SurfaceArea: {
            type: sequelize.FLOAT(10,2),
            allowNull: false,
            defaultValue: 0.00
        },
        IndepYear: {
            type: sequelize.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        Population: {
            type: sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        LifeExpectancy: {
            type: sequelize.FLOAT(3,1),
            allowNull: true,
            defaultValue: null
        },
        GNP: {
            type: sequelize.FLOAT(10,2),
            allowNull: true,
            defaultValue: null
        },
        GNPOld: {
            type: sequelize.FLOAT(10,2),
            allowNull: true,
            defaultValue: null
        },
        LocalName: {
            type: sequelize.STRING(45),
            allowNull: false,
            defaultValue: ''
        },
        GovernmentForm: {
            type: sequelize.STRING(45),
            allowNull: false,
            defaultValue: ''
        },
        HeadOfState: {
            type: sequelize.STRING(60),
            allowNull: true,
            defaultValue: null
        },
        Capital: {
            type: sequelize.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        Code2: {
            type: sequelize.STRING(2),
            allowNull: false,
            defaultValue: ''
        }
    });
};
