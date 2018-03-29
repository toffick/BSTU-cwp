import net from 'net';
import Launcher from './lib/launcher.js';

const ADD = "add";
const GET = "get";
const REM = "rem";
const launcher = new Launcher();

net.createServer(function (socket){
    socket.setEncoding('utf8');
    socket.on('data', function (data){
        let {type, X = 1, id} = JSON.parse(data);

        switch (type) {
            case ADD:
                launcher.createWorker(X, sendToHttpSocket);
                break;
            case GET:
                launcher.getWorkers(sendToHttpSocket);
                break;
            case REM:
                launcher.killWorker(id, sendToHttpSocket);
                break;
            default:
                break;
        }
    });

    function sendToHttpSocket(worker){
        socket.write(JSON.stringify(worker));
    }
}).listen(5000);

