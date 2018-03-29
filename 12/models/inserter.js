const pizzas = require('../content/pizzas.json');
const weapons = require('../content/weapons.json');
const turtles = require('../content/turtles.json');
const Promise = require('bluebird');

module.exports = (db) =>{
   // return  db.bulkCreate([...pizzas, ...weapons, ...turtles])
    return Promise.all([
        db.pizzas.create(pizzas[0]),
        db.pizzas.create(pizzas[1]),
        db.pizzas.create(pizzas[2]),
        db.pizzas.create(pizzas[3]),
        db.weapons.create(weapons[0]),
        db.weapons.create(weapons[1]),
        db.weapons.create(weapons[2]),
        db.weapons.create(weapons[3]),
        db.turtles.create(turtles[0]),
        db.turtles.create(turtles[1]),
        db.turtles.create(turtles[2]),
        db.turtles.create(turtles[3]),
    ]);
};
