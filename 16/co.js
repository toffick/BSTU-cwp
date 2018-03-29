const co = require('co');
const axios = require('axios');
const Promise = require('bluebird');
const google_api_key = 'AIzaSyB1NhKYM8AFE4r7nEYcBqlEZ1BDkMa7bEw';
const geolib = require('geolib');

function getAsioxQuery(url){
    return axios.get(url);
}

(async () =>{
    console.log('//1');
    let minskBrestInfo = await co(function* (){
        return yield Promise.all([
            getAsioxQuery(`https://maps.googleapis.com/maps/api/geocode/json?address=Minsk&key=${google_api_key}`),
            getAsioxQuery(`https://maps.googleapis.com/maps/api/geocode/json?address=Brest&key=${google_api_key}`),
        ])
    });
    console.log(geolib.getDistance(
        minskBrestInfo[0].data.results[0].geometry.location,
        minskBrestInfo[1].data.results[0].geometry.location));


    console.log('//2');
    let nearestMinsk = await co(function* (){
        return yield Promise.mapSeries([
            `https://maps.googleapis.com/maps/api/geocode/json?address=Minsk&key=${google_api_key}`,
            `https://maps.googleapis.com/maps/api/geocode/json?address=Copenhagen&key=${google_api_key}`,
            `https://maps.googleapis.com/maps/api/geocode/json?address=Oslo&key=${google_api_key}`,
            `https://maps.googleapis.com/maps/api/geocode/json?address=Brussel&key=${google_api_key}`
        ], (item) =>{
            return getAsioxQuery(item);
        });

    });
    let coords = nearestMinsk.map((item) =>{
        return item.data.results[0].geometry.location;
    })
    let cityItem = geolib.findNearest(coords[0], coords, 1);
    console.log(nearestMinsk[cityItem.key].data.results[0].address_components[0].long_name);


    console.log('//3');
    let streetInfo = await co(function* (){
        return yield getAsioxQuery(`https://maps.googleapis.com/maps/api/geocode/json?address=Piazza del Сolosseo&key=${google_api_key}`);
    });
    console.log(streetInfo.data.results[0]);
    let componentsInfo = await co(function* (){
       return yield Promise.mapSeries(streetInfo.data.results[0].address_components, (component) =>{
            return getAsioxQuery(`https://maps.googleapis.com/maps/api/geocode/json?address='${encodeURI(component.long_name)}'&key=${google_api_key}`)
        })
    });
    componentsInfo.forEach((val) =>{
        console.log(val.data.results[0].geometry.location);
    });


})();