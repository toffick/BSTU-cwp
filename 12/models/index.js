const Turtle = require('./turtle');
const Weapon = require('./weapon');
const Pizza = require('./pizza');

module.exports = (Sequelize, config) =>{

    const sequelize = new Sequelize(config.db.name, config.db.user, config.db.pass, config.db.options);

    const turtles = Turtle(Sequelize, sequelize);
    const weapons = Weapon(Sequelize, sequelize);
    const pizzas = Pizza(Sequelize, sequelize);


    turtles.belongsTo(weapons, {foreignKey: 'weaponId'});
    turtles.belongsTo(pizzas, {foreignKey: 'firstFavoritePizzaId', as: 'firstFavoritePizza'});
    turtles.belongsTo(pizzas, {foreignKey: 'secondFavoritePizzaId', as: 'secondFavouritePizza'});

    return {
        turtles,
        weapons,
        pizzas,

        sequelize: sequelize,
        Sequelize: Sequelize,
    };
};