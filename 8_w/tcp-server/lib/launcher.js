const child_process = require('child_process');
const uuid = require('uuid');
const fs = require('fs');
const promise = require('bluebird');
const readFileAsync = promise.promisify(fs.readFile);

export default class Launcher {
    constructor(){
        this.workersMap = new Map();
        this.workersLogsPath = './worker-files';
    }

    createWorker(X, cb){
        let id = uuid.v1();
        let processFilePath = `${this.workersLogsPath}/${id}.txt`;
        let pid = child_process.spawn(`node`, ['./worker.js', processFilePath, X], {detached: true}).pid;
        let startedOn = Date.now();
        this.workersMap.set(id, {pid, startedOn, processFilePath});
        cb({id, startedOn, processFilePath, pid});
    };

    async killWorker(id, cb){
        await  this.getWorkerInformation(id, (worker) =>{
            process.kill(worker.workerProcessInfo.pid);
            this.workersMap.delete(id);
            cb(worker);
        });

    };

    async getWorkerInformation(id, cb){
        let workerProcessInfo = this.workersMap.get(id);
        let {processFilePath} = workerProcessInfo;
        await readFileAsync(processFilePath, 'utf8').then((data) =>{
            cb({id, workerProcessInfo, data});
        });
    }

    async getWorkers(cb){
        const workers = [];
        for (let entry of this.workersMap.keys()) {
            await this.getWorkerInformation(entry, (worker) =>{
                workers.push(worker);
            });
        }
        cb(workers);
    };
}
