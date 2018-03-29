module.exports = (sequelize, connection) =>{
    return connection.define('FilmsActors', {
        filmId: {
            type: sequelize.INTEGER,
            allowNull: false
        },
        actorId: {
            type: sequelize.INTEGER,
            allowNull: false,
        }
    });
};

