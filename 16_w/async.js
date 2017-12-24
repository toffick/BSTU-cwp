const axios = require('axios');
const Promise = require('bluebird');
const google_api_key = 'AIzaSyB1NhKYM8AFE4r7nEYcBqlEZ1BDkMa7bEw';

function getAsioxQuery(url){
    return axios.get(url);
}

(async () =>{
    console.log('//1');
    let promiseAll = await Promise.all([
        getAsioxQuery(`https://maps.googleapis.com/maps/api/geocode/json?address=Minsk&key=${google_api_key}`),
        getAsioxQuery(`https://maps.googleapis.com/maps/api/geocode/json?address=Madrid&key=${google_api_key}`),
        getAsioxQuery(`https://maps.googleapis.com/maps/api/geocode/json?address=Rome&key=${google_api_key}`)
    ]);
    for (let item of promiseAll) {
        console.log(item.data.results[0].formatted_address);
    }

    console.log('//2');
    let promiseAny = await Promise.any([
        getAsioxQuery(`https://maps.googleapis.com/maps/api/geocode/json?address=Paris&key=${google_api_key}`),
        getAsioxQuery(`https://maps.googleapis.com/maps/api/geocode/json?address=Nice&key=${google_api_key}`),
    ]);
    console.log(promiseAny.data.results[0].formatted_address);

    console.log('//3');
    let streetInfo = await getAsioxQuery(`https://maps.googleapis.com/maps/api/geocode/json?address=Via Nicola Salvi&key=${google_api_key}`);
    console.log(streetInfo.data.results[0]);
    let componentsInfo = await Promise.mapSeries(streetInfo.data.results[0].address_components, (component)=>{
        return getAsioxQuery(`https://maps.googleapis.com/maps/api/geocode/json?address='${encodeURI(component.long_name)}'&key=${google_api_key}`)
    });
    componentsInfo.forEach((val)=>{
        console.log(val.data.results[0].geometry.location);
    });
})()
