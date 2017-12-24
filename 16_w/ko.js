const Promise = require('bluebird');

const pr = new Promise((res, rej) =>{
    throw new Error("df");
});

pr.then(() =>{
}, (err)=>{
    console.log(err);
});