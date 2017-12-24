import axios from 'axios';
import promise from 'bluebird';

// function getPokeminWithId(id){
//     return axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
// }
//
// function getSomePokemons(limit){
//     return axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}`);
// }
//
// function getSomeLocations(limit){
//     return axios.get(`https://pokeapi.co/api/v2/location/?limit=${limit}`);
// }
//
// function getSomeItems(limit){
//     return axios.get(`https://pokeapi.co/api/v2/item/?limit=${limit}`);
// }
//
// function getBerry(id){
//     return axios.get(`https://pokeapi.co/api/v2/berry/${id}`);
// }
//
//
// function getNPokemons(count, limit){
//     let functions = [];
//     for (let i = 0; i < count; i += limit) {
//         functions.push(getSomePokemons(limit));
//     }
//     return promise.all(functions);
// }
//
// function get147Pokemons(){
//     let fcs = [];
//     for (let i = 1; i < 8; i += 3) {
//         fcs.push(getPokeminWithId(i));
//     }
//     return promise.any(fcs);
// }
//
// function getProp(limit){
//     return promise.props({
//         pokemons: getSomePokemons(limit),
//         items: getSomeItems(limit),
//         locations: getSomeLocations(limit),
//     })
// }
//
// function getMap(berriesArray){
//     return promise.map(berriesArray, (id) =>{
//         return getBerry(id);
//     });
// }
//
//
// getPokeminWithId(42)
//     .then(function (response){
//         let {name, weight, height} = response.data;
//         console.log(`########### TASK1 ###########\n ${name} ${weight} ${height}`);
//     })
//     .catch(function (error){
//         console.error(error);
//     });
//
// getNPokemons(30, 10)
//     .then((results) =>{
//         console.log('########### TASK2 ###########\n');
//         results.forEach((val, resInd) =>{
//             val.data.results.forEach((pokemonItem, ind) =>{
//                 console.log(`${resInd}${ind} - ${pokemonItem.name}`);
//             });
//             console.log('------------------\n');
//         });
//     })
//     .catch((err) =>{
//         console.error(err);
//     });
//
// get147Pokemons()
//     .then((response) =>{
//         console.log(`########### TASK3 ###########\n  ${response.data.name}`);
//     })
//     .catch((err) =>{
//         console.error(err);
//     });
//
//
// getProp(10)
//     .then((result) =>{
//         console.log(`########### TASK4 ###########`);
//         Object.values(result).forEach((prop) =>{
//             console.log();
//             prop.data.results.forEach((val) =>{
//                 console.log(val.name);
//             });
//         })
//     })
//     .catch((err) =>{
//         console.error(err);
//     });
//
// getMap([1, 2, 3, 4])
//     .then((result) =>{
//         console.log(`########### TASK5 ###########`);
//         result.forEach((val) =>{
//             console.log(val.data.name);
//         });
//     });

axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=Minsk`).then(res =>{
    console.log(res.data.results);
});

