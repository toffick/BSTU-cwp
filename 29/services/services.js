const TurtleService = require('./TurtleService');
const WeaponService = require('./WeaponService');
const PizzaService = require('./PizzaService');

module.exports = (db) => {

    const weaponService = new WeaponService(
        db.weapons
    );
    const turtleService = new TurtleService(
        db
    );
    const pizzaService = new PizzaService(
        db.pizzas
    );

    return {
        'weapon': weaponService,
        'turtle': turtleService,
        'pizza': pizzaService,
    }
};
