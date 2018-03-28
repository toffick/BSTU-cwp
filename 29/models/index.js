module.exports = (Sequelize, config) => {
	const sequelize = new Sequelize(config.db.name, config.db.user, config.db.pass, config.db.options);

  const Turtle = require('../models/turtle')(Sequelize, sequelize);
  const Pizza = require('../models/pizza')(Sequelize, sequelize);
  const Weapon = require('../models/weapon')(Sequelize, sequelize);

  Weapon.hasOne(Turtle);

  Pizza.hasOne(Turtle, {as: 'favoritePizza'});
  Pizza.hasOne(Turtle, {as: 'secondFavoritePizza'});

  return {
    turtles: Turtle,
    pizzas: Pizza,
    weapons: Weapon,

    sequelize: sequelize,
    Sequelize: Sequelize,
    Op: Sequelize.Op,
  };
};
