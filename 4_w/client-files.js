// client-files.js
const net = require('net');
const fs = require('fs');
const path = require('path');

const filesDirectories = process.argv.slice(2);

const endSendingFile = "ENDFILE";
const OkServerStatus = 'ACK';
const ErrServerStatus = 'DEC';
const OkClientStatus = 'FILES';
const nextFileStatus = 'NEXTFILE';
const separator = '|||||';

const connectionAddressObj = {host: "127.0.0.1", port: 3001};
const client = new net.Socket();

let allFiles = [];


client.setEncoding('utf8');

client.connect(connectionAddressObj, (err) => {

    if (err) throw err;

    getDirectoriesFromCmd().forEach((dirVal) => {
        readAllFilesNames(dirVal);
    });
    client.write(OkClientStatus);

});

client.on('error', (err) => {
    console.error(err);
});

client.on('data', abortSendingDialog);
client.on('data', createSendingDialog);

function abortSendingDialog(data) {
    if (data === ErrServerStatus) {
        console.log(data);
        client.destroy();
    }
}

function createSendingDialog(data) {
    if (data === OkServerStatus || nextFileStatus) {
        sendNextFile()
    }
}

function sendNextFile() {
    if (allFiles.length !== 0) {

        let tmpFileName = allFiles.shift();

        fs.readFile(tmpFileName, (err, data) => {

            client.write(data);
            client.write(separator + path.basename(tmpFileName));
            client.write(separator + endSendingFile);

        });
    } else {
        client.end();
    }
}

function readAllFilesNames(dirVal) {
    fs.readdirSync(dirVal).forEach((fileVal) => {

        let filePath = path.normalize(dirVal + '\\' + fileVal);
        if (fs.statSync(filePath).isFile()) {
            allFiles.push(filePath);
        }
        else {
            readAllFilesNames(filePath);
        }
    })
}

function getDirectoriesFromCmd() {
    return process.argv.slice(2);
}
