module.exports = db => {
	const servises = require('./services/services')(db);

	const resolverMap = {
		Query: {
			turtles() {
				return servises.turtle.readChunk();
			},
			turtle(_, {id}) {
				return servises.turtle.read(id);
			},
			weapons(_, {limit, order}) {
				return servises.weapon.readChunk({
					limit: limit,
					order: order,
				});
			},
			weapon(_, {id}) {
				return db.weapons.findById(id, {raw: true});
			},
			pizzas(_, {limit, order}) {
				return servises.pizza.readChunk({
					limit: limit,
					order: order,
				});
			},
			pizza(_, {id}) {
				return db.pizzas.findById(id, {raw: true});
			},
		},

		Turtle: {
			weapon(turtle) {
				return db.weapons.findById(turtle.weaponId, {raw: true})
			},
			favoritePizza(turtle, context) {
				return db.pizzas.findById(turtle.favoritePizzaId, {raw: true})
			},
			secondFavoritePizza(turtle) {
				return db.pizzas.findById(turtle.secondFavoritePizzaId, {raw: true})
			},
			filterByFavoritePizza(turtle, context) {
				return servises.pizza.getByFavoritePizza(context.filter, [
					turtle.favoritePizzaId, turtle.secondFavoritePizza
				], db)
			},
		},

		Mutation: {
			createTurtle(obj, context) {
				return servises.turtle.create({
					body: context.turtle
				});
			},
			updateTurtle(obj, context) {
				return servises.turtle.update({
					body: context.turtle
				}, {id: context.id});
			},
			deleteTurtle(obj, context) {
				return servises.turtle.delete(context.id);
			},

			changeStateFavoritePizza(turtleId, pizzaId, state) {
				return servises.turtle.changeStateFavoritePizza(turtleId, pizzaId, state);
			},

			changeStateFavoriteWeapon(turtleId, weaponId, state) {
				return servises.turtle.changeStateFavoriteWeapon(turtleId, weaponId, state);
			}

		}
	};

	return resolverMap;
};
