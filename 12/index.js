const Sequelize = require('sequelize');
const config = require('./config.json');
const db = require('./models')(Sequelize, config);
const inserter = require('./models/inserter');

(async () =>{
    await db.sequelize.sync({force: true});

    await inserter(db);

    let sp = space();

    sp();
    (await allTurtles(db)).forEach((turtle) =>{
        console.log(turtle.name);
    });

    sp();
    (await turtlesFavouriteMozzarella(db)).forEach((turtle) =>{
        console.log(turtle.dataValues.name);
    });

    sp();
    let allFavoritePizzas = await showAllFavouriteDISTINCT(db);
    allFavoritePizzas.forEach((val) =>{
        console.log(val.dataValues.firstFavoritePizza.dataValues.name);
    });
    sp();
    let myTurtle = (await createNewTurtle(db));
    console.log(myTurtle.dataValues.name);


    sp();
    let pizzasForUpdate = await SUPERFATUpdate(db);
    pizzasForUpdate.forEach((pizza) =>{
        pizza.update({description: pizza.description + 'SUPER FAT'});
    });

    sp();
    (await getWeaponsWithDpsGreatThan100(db)).forEach((weapon) =>{
        console.log(weapon.dataValues.name);
    });

    sp();
    console.log((await findPizzaWithId1(db)).dataValues.name);

    sp();
    setFavoritePizzaToMyTurtle(db, myTurtle);

})();


function space(){
    let count = 0;
    return () =>{
        count++;
        console.log(`\n${count}----------`);
    }
}

function allTurtles(db){
    return db.turtles.findAll({raw: true});
}

function turtlesFavouriteMozzarella(db){
    return db.turtles.findAll({
        attributes: ['name', 'color', 'firstFavoritePizzaId'],
        include: {
            model: db.pizzas,
            as: 'firstFavoritePizza',
            where: {name: 'Mozzarella'},
        }
    });
}


function showAllFavouriteDISTINCT(db){
    return db.turtles.findAll({
        include: {
            model: db.pizzas,
            as: 'firstFavoritePizza'
        },
        group: ['firstFavoritePizzaId']
    });
}

function createNewTurtle(db){
    return db.turtles.create({
        name: "Nickolay",
        color: "blue",
        weaponId: 3
    });
}

function SUPERFATUpdate(db){

    return db.pizzas
        .findAll({
            where: {
                calories: {
                    $gt: 300
                }
            }
        });
}

function getWeaponsWithDpsGreatThan100(db){
    return db.weapons
        .findAll({
            where: {
                dps: {
                    $gt: 100
                }
            }
        });
}

function findPizzaWithId1(db){
    return db.pizzas.findById(1);
}

async function setFavoritePizzaToMyTurtle(db, myTurtle){
    let pizza = await db.pizzas.findById(1);
    myTurtle.setFirstFavoritePizza(pizza);
}

