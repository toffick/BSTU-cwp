const CrudService = require('./CrudService');

class TurtleService extends CrudService {
	constructor(repository,
							errors) {
		super(repository.turtles, errors);
		this.pizzas = repository.pizzas;
	}

	async readChunk(filters) {

		return super.readChunk({
			addingOptions: {
				where: {}
			}
		});
	}

	async changeStateFavoritePizza(obj, context) {
		let pizza = context.state ? context.pizzaId : null;
		let turtle = await super.read(context.turtleId);
		if (turtle.favoritePizzaId) {
			turtle.secondFavoritePizzaId = pizza;
		} else {
			turtle.favoritePizzaId = pizza;
		}

		return await turtle.save();
	}

	async changeStateFavoriteWeapon(obj, context) {
		let weapon = context.state ? context.weaponId : null;
		let turtle = await super.read(context.turtleId);
		turtle.weaponId = weapon;

		return turtle.save();
	}

	getByFavoritePizza(filter, db) {
		return this.repository.findAll({
			where: {
				$or: [
					{
						'$favoritePizza.name$': {
							$like: `%${filter}%`
						}
					},
					{
						'$secondFavoritePizza.name$': {
							$like: `%${filter}%`

						}
					}
				]
			},
			include: [
				{model: this.pizzas, as: 'favoritePizza'},
				{model: this.pizzas, as: 'secondFavoritePizza'},
			]

		});
	}

}

module.exports = TurtleService;
