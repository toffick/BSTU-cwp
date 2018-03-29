const City = require('./models/city');
const Country = require('./models/country');
const Countrylanguage = require('./models/countrylanguage');
const config = require('./config.json');

module.exports = (Sequelize) =>{
    const connection = new Sequelize(config.db.name, config.db.user, config.db.pass, config.db.options);

    const city = City(Sequelize, connection);
    const country = Country(Sequelize, connection);
    const countrylanguage = Countrylanguage(Sequelize, connection);

    country.hasMany(city, {foreignKey: 'CountryCode'});
    country.hasMany(countrylanguage, {foreignKey: 'CountryCode'});

    return {
        Sequelize,
        connection,
        models: {
            city,
            country,
            countrylanguage,
        }
    };
};