// import promise from 'bluebird';
//
// const fs = promise.promisifyAll(require("fs"));
//
// const dirs = [
//     'TEST/dir-1/dir-1-1',
//     'TEST/dir-1/dir-1-2',
//     'TEST/dir-1/dir-1-2/dir-1-2-1',
//     'TEST/dir-2/dir-2-1/dir-2-1-1',
//     'TEST/dir-2/dir-2-2/dir-2-2-1',
//     'TEST/dir-2/dir-2-1/dir-2-2-2/dir-2-2-2-1',
//     'TEST/dir-3',
//     'TEST/dir-3/dir-3-1',
//     'TEST/dir-3/dir-3-2/dir-3-2-1',
//     'TEST/dir-3/dir-3-3/dir-3-3-1'
// ];
//
// promise.mapSeries(dirs, (dirName) =>{
//     return dirName.split('/');
// }).then((dirFullnamesArrays) =>{
//     promise.mapSeries(dirFullnamesArrays, (dirFullnamesOnceArray) =>{
//         let tempPath = '';
//         promise.mapSeries(dirFullnamesOnceArray, (dirName) =>{
//             tempPath += dirName + '/';
//             return fs.mkdirAsync(tempPath);
//         });
//     });
// });

const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));
const path = require("path");

class Dirs {
    static getDirTemplate(){
        return [
            "dir-1/dir-1-1",
            "dir-1/dir-1-2",
            "dir-1/dir-1-2/dir-1-2-1",
            "dir-2/dir-2-1/dir-2-1-1",
            "dir-2/dir-2-2/dir-2-2-1",
            "dir-2/dir-2-1/dir-2-2-2/dir-2-2-2-1",
            "dir-3/dir-3-1",
            "dir-3",
            "dir-3/dir-3-2/dir-3-2-1",
            "dir-3/dir-3-3/dir-3-3-1"
        ];
    }

    static mkDirByTemplate(path){
        const SPLIT_SYMBOL = "/";
        const dirs = Dirs.getDirTemplate().map(dir => dir.split(SPLIT_SYMBOL));
        const pathArray = [];

        dirs.forEach(fullPath =>{
            let currentPath = "";
            fullPath.forEach(dir =>{
                currentPath += dir + "/";
                const dirPath = `${path}/${currentPath}`;
                pathArray.push(dirPath);
            });
        });

        Promise.resolve(pathArray)
            .map(item => fs.mkdirAsync(item))
            .mapSeries(i => i())
            .then(res => console.log(res), exc => console.log(exc));
    }
};

Dirs.mkDirByTemplate('./TEST');