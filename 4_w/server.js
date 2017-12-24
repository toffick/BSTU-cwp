// server.js
const net = require('net');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const port = 3001;

const ClientQAstatus = 'QA';
const ClientFILESstatus = 'FILES';
const endSendingFile = "ENDFILE";
const sendNextFile = 'NEXTFILE';
const ClientREMOTEStatus = "REMOTE";

const separator = '|||||';


const serverResOKstatus = 'ACK';
const serverResErrstatus = 'DEC';

const qaPath = "./qa.json";
const clientQALogPathDefault = './logs';
const recvFilesDirpath = process.env.FILESDIR;
const encodeAlgorithm = "aes-256-ctr";

let seed = 0;
let Clients = [];
let questions = [];
let filesChanks = [];

const server = net.createServer(function (client) {

    client.on('error', function (err) {
        console.error(err);
    });
    client.on('end', function () {
        Clients[client.id] = undefined;
        console.log(`Client ${client.id} disconnected`);
    });
    client.on('data', createClientDialog);
    client.on('data', ClientDialogQA);
    client.on('data', ClientDialogFILES);
    client.on('data', ClientDialogREMOTE);

    function createClientDialog(data, err) {
        if (!err) {
            if (!client.id && (data.toString() === ClientQAstatus || ClientFILESstatus || ClientREMOTEStatus)) {
                client.id = getUniqId() + seed++;
                Clients[client.id] = data.toString();                                               //тип клиента QA/FILES/REMOTE по его id

                if (Clients[client.id] === ClientFILESstatus) {
                    createDirIfNotExist(recvFilesDirpath + path.sep + client.id.toString());
                    filesChanks[client.id] = [];
                }
                client.write(serverResOKstatus);
                console.log('Client ' + client.id + " connected: " + Clients[client.id]);
            }
        } else {
            client.write(serverResErrstatus);
            client.write(err);
        }
    }
    function ClientDialogQA(data, err) {
        if (!err) {
            let dataString = data.toString();
            if (Clients[client.id] === ClientQAstatus && dataString !== ClientQAstatus) {

                let questionObj = getQuestionObj(dataString);
                let serverAnswer = questionObj[(Math.random() < 0.5) ? "corr" : "incorr"].toString();

                clientQALogWrite('Q: ' + questionObj.question, client.id);
                clientQALogWrite('A: ' + serverAnswer, client.id);

                client.write(serverAnswer);
            }
        }
        else {
            clientQALogWrite(err, client.id);
        }
    }
    function ClientDialogFILES(data, err) {
        if (!err) {
            if (Clients[client.id] === ClientFILESstatus) {
                let bufferChank = Buffer.from(data);
                filesChanks[client.id].push(bufferChank);

                if (data.toString().endsWith(endSendingFile)) {
                    createFileFromBinData(client.id);
                    client.write(sendNextFile);
                }
            }
        }
        else {
            console.error(err);
        }
    }
    function ClientDialogREMOTE(data, err) {
        if (!err) {
            if (Clients[client.id] === ClientREMOTEStatus && data.toString() !== ClientREMOTEStatus) {
                let msgParts = data.toString().split(separator);

                let requestType = msgParts[0];
                let fileName = msgParts[1];
                let proccFileName = msgParts[2];
                let key = msgParts[3];

                switch (requestType) {
                    case "COPY":
                        createFileWithStream(fileName, proccFileName);
                        break;
                    case "ENCODE":
                        createFileWithStream(fileName, proccFileName, crypto.createCipher(encodeAlgorithm, key));
                        break;
                    case "DECODE":
                        createFileWithStream(fileName, proccFileName, crypto.createDecipher(encodeAlgorithm, key));
                        break;
                    default:
                        break;
                }
            }
        }
        else {
            console.error(err);
        }
    }
});

server.maxConnections = process.env.FILESMAXCLIENT;

server.listen(port, 'localhost', function () {
    console.log("start server");
    fs.readFile(qaPath, function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            questions = JSON.parse(data);
            initDirs();
        }
    });
});


//REMOTE area
function createFileWithStream(fileName, newFileName, transformStream) {
    fs.stat(fileName, (err) => {
        if (!err) {
            const rd = fs.createReadStream(fileName);
            const ws = fs.createWriteStream(newFileName);
            if (transformStream) {
                rd.pipe(transformStream).pipe(ws);
            } else {
                rd.pipe(ws);
            }
            console.log('File ' + fileName+' created');
        } else {
            console.error(err);
        }
    });
}
//REMOTE area

//FILES area
function createFileFromBinData(id) {

    let fileChanks = Buffer.concat(filesChanks[id]);

    let separatorIndex = fileChanks.indexOf(separator);                                                         //TODO data....||||||PathEn||||||FilNDFILE
    let fileName = fileChanks.slice(separatorIndex).toString().split(separator)[1];

    fs.writeFile(recvFilesDirpath + path.sep + id + path.sep + fileName, fileChanks.slice(0, separatorIndex), function (err) {
            if (err)
                console.error(err);
        }
    );
    filesChanks[id] = [];
}
//FILES area

//QA area
function getQuestionObj(question) {
    for (let i = 0; i < questions.length; i++) {
        if (questions[i].question === question) {
            return questions[i];
        }
    }
}
function clientQALogWrite(data, clientid) {
    fs.appendFileSync(`${clientQALogPathDefault}//client_${clientid}.txt`, data + '\r\n');
}
//QA area

function initDirs() {
    createDirIfNotExist(recvFilesDirpath);
    createDirIfNotExist(clientQALogPathDefault);
}
function createDirIfNotExist(path) {
    if (!fs.existsSync(path))
        fs.mkdirSync(path);
}
function getUniqId() {
    return Date.now() + seed++;
}