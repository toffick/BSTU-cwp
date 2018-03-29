module.exports = (sequelize, connection) =>{
    return connection.define('city', {
        ID: {
            type: sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Name: {
            type: sequelize.STRING(35),
            allowNull: false,
            defaultValue: ''
        },
        CountryCode: {
            type: sequelize.STRING(3),
            allowNull: false,
            defaultValue: ''
        },
        District: {
            type: sequelize.STRING(20),
            allowNull: false,
            defaultValue: ''
        },
        Population: {
            type: sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    });
};



// CREATE TABLE `city` (
//     `ID` INT(11) NOT NULL AUTO_INCREMENT,
//     `Name` CHAR(35) NOT NULL DEFAULT '',
//     `CountryCode` CHAR(3) NOT NULL DEFAULT '',
//     `District` CHAR(20) NOT NULL DEFAULT '',
//     `Population` INT(11) NOT NULL DEFAULT '0',
//     PRIMARY KEY (`ID`),
//     KEY `CountryCode` (`CountryCode`),
//     CONSTRAINT `city_ibfk_1` FOREIGN KEY (`CountryCode`) REFERENCES `country` (`Code`)
// )