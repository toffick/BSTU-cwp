// client-files.js
const net = require('net');
const fs = require('fs');
const path = require('path');

const OkServerStatus = 'ACK';
const ErrServerStatus = 'DEC';
const OkClientStatus = "REMOTE";

const COPYStatus = "COPY";
const ENCODEStatus = "ENCODE";
const DECODEStatus = "DECODE";
const key = "j5kdFJK3dfjKJDf";
const separator = '|||||';

let requestType = process.argv[2];
let filePath = process.argv[3];

const connectionAddressObj = {host: "127.0.0.1", port: 3001};
const client = new net.Socket();

client.setEncoding('utf8');

client.connect(connectionAddressObj, (err) => {
    if (err) console.error(err);
    client.write(OkClientStatus);
});

client.on('error', (err) => {
    console.error(err);
});

client.on('data', createSendingDialog);
client.on('data', abortSendingDialog);

function createSendingDialog(data) {
    if (data === OkServerStatus) {
        switch (requestType) {
            case COPYStatus:
                sendMsg(COPYStatus, filePath, "copy-");
                break;
            case ENCODEStatus:
                sendMsg(ENCODEStatus, filePath, "encode-",key);
                break;
            case DECODEStatus:
                sendMsg(DECODEStatus, filePath, "decode-",key);
                break;
            default:
                break;
        }
        client.end();
    }
}

function abortSendingDialog(data) {
    if (data === ErrServerStatus) {
        console.log(data);
        client.destroy();
    }
}

function sendMsg(requestType, filePath, filePrefix, key) {
    let fileName = path.dirname(filePath) + filePrefix + path.basename(filePath);
    let msg = requestType + separator + filePath + separator + fileName + separator + key;
    client.write(msg);
    client.end();
}

