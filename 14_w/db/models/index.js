const Films = require('./films');
const Actors = require('./actors');
const FilmsActors = require('./filmsActors');
const config = require('../config/config.json');

module.exports = (Sequelize) =>{
    const connection = new Sequelize(config.database, config.user, config.pass, config.options);

    const films = Films(Sequelize, connection);
    const actors = Actors(Sequelize, connection);
    const filmsActors = FilmsActors(Sequelize, connection);

    actors.belongsToMany(films, {through: filmsActors});
    films.belongsToMany(actors, {through: filmsActors});

    return {
        Sequelize,
        connection,
        models: {
            films,
            actors,
            filmsActors
        }
    };
};