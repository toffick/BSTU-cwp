const Sequelize = require('Sequelize');
const content_films = require('./db/content/films.json');
const content_actors = require('./db/content/actors.json');
const Op = Sequelize.Op;

const {models, connection} = require('./db/models')(Sequelize);

(async () =>{
    try {
        await connection.sync({force: true});


        //2
        await models.films.bulkCreate(content_films.slice(0, 3), {validate: true});
        await models.actors.bulkCreate(content_actors.slice(0, 4), {validate: true});
        await models.filmsActors.bulkCreate([
            {filmId: 1, actorId: 1},
            {filmId: 1, actorId: 2},
            {filmId: 1, actorId: 3},
            {filmId: 2, actorId: 1},
            {filmId: 2, actorId: 2},
            {filmId: 3, actorId: 3},
            {filmId: 3, actorId: 1},
            {filmId: 3, actorId: 2}]);
//3
        await models.actors
            .update({liked: 1000}, {where: {filmsNumber: {[Op.gt]: 6}}});

//4
        let deletedActor = await models.actors
            .destroy({where: {liked: 0}});
        console.log('Deleted actors number: ' + deletedActor);


//5
        let films = await models.films.findAll({
            attributes: ['title', 'year'],
            include: [{
                model: models.actors,
                attributes: ['name', 'liked'],
            }],
            raw: true
        });
        console.log(films);
        console.log('------------------------\n\n\n');

//6
        let films1994 = await models.films
            .scope('releaseDate1994')
            .findAll({raw: true});
        console.log(films1994);
        console.log('------------------------\n\n\n');

//7
        let createdObjWithHook = await models.actors.create(content_actors[3]);
        console.log(createdObjWithHook.get({raw: true}));
        console.log('------------------------\n\n\n');


//8
        t = await  connection.transaction();
        let actors = await models.actors.findAll({attributes: ['name', 'liked'], raw: true}, {transaction: t});
        console.log(actors);
        let countUpdated = await models.actors.update({liked: 0}, {where: {}, transaction: t});
        // console.log(countUpdated);
        // await t.commit();
        // actors = await models.actors.findAll({attributes: ['name', 'liked'], raw: true}, {transaction: t});
        console.log(actors);
        setTimeout(async () =>{
            console.log('transaction has been rollbacked');
            return await t.rollback();
        }, 5000);

//9
//sequelize db:migrate          -> add column gender
//sequelize db:migrate:undo     -> remove column genders

    }
    catch (err) {
        console.error(err);
    }
})();

