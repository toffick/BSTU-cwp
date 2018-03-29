const ADD = "add";
const GET = "get";
const REM = "rem";

export default class Worker {
    getWorkers(data, cb){
        cb(null, {type: GET});
    };

    addWorker(data, cb){
        let {X} = data;
        cb(null, {type: ADD, X});
    };

    remoweWorker(data, cb){
        let {id} = data;
        cb(null, {type: REM, id});
    };
}