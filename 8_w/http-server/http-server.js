import http from 'http';
import WorkerController from './controllers/worker-controller';
import ErrorController from './controllers/error-controller';
import Connector from './lib/tcp-connector'

const serverConfig = {port: 3000, host: '127.0.0.1'};
const serverConfigTcp = {port: 5000, host: '127.0.0.1'};

const connector = new Connector(serverConfigTcp);
connector.createSocketConnection();

const Controllers = {
    worker: new WorkerController(),
    error: new ErrorController()
};

const handlers = {
    '/workers': Controllers.worker.getWorkers,
    '/workers/add': Controllers.worker.addWorker,
    '/workers/remove': Controllers.worker.remoweWorker
};

const server = http.createServer((req, res) =>{
    const handler = getHandler(req.url);
    parseBodyJson(req, (err, payload) =>{
        res.setHeader('Content-Type', 'application/json');
        if (err) {
            res.statusCode = err.code;
            res.end(JSON.stringify(err));
        }
        else {
            handler(payload, (err, result) =>{
                connector.send(JSON.stringify(result));
                connector.recieve((data) =>{
                    res.statusCode = 200;
                    res.end((data.toString()));
                });
            });
        }
    });
});

server.listen(serverConfig.port, serverConfig.host, () =>{
    console.log(`Server running at http://${serverConfig.host}:${serverConfig.port}/`);
});

function getHandler(url){
    return handlers[url] || Controllers.error.SetNotFoundError;
}

function parseBodyJson(req, cb){
    let body = [];
    req.on('data', function (chunk){
        body.push(chunk);
    }).on('end', function (){
        body = Buffer.concat(body).toString();
        let params;
        if (body !== "") {
            try {
                params = JSON.parse(body);
                cb(null, params);
            } catch (e) {
                console.log(e);
                Controllers.error.SetRequestInvalidError(null, cb);
            }
        }
        else {
            Controllers.error.SetRequestInvalidError(null, cb);
        }
    });
}
