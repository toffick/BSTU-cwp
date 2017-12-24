// client-qa.js
const net = require('net');
const fs = require('fs');

const OkServerStatus = 'ACK';
const ErrServerStatus = 'DEC';
const OkClientStatus = 'QA';

const connectionAddressObj = {host: "127.0.0.1", port: 3001};
const qaPath = "./qa.json";

const client = new net.Socket();

let questions = [];

let currentQuestionIndex = 0;

client.setEncoding('utf8');

client.connect(connectionAddressObj, function () {

    fs.readFile(qaPath, function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            questions = JSON.parse(data);
            shuffleQuestion();

            client.write(OkClientStatus);
        }
    });

});


client.on('data', function (data) {
    if (data === OkServerStatus) {
        client.write(questions[currentQuestionIndex].question);
    }
    else if (data === ErrServerStatus) {
        console.log(data);
        client.destroy();

    }
    else if (data !== OkServerStatus) {
        console.log("\nQuestion: " + questions[currentQuestionIndex].question);
        console.log("Server answer: " + data);
        console.log(data === questions[currentQuestionIndex].corr.toString() ?
            "Server answer is true" :
            "True answer: " + questions[currentQuestionIndex].corr);
        if (++currentQuestionIndex !== questions.length) {
            client.write(questions[currentQuestionIndex].question)
        }
        else {
            client.destroy();
        }
    }
});

function shuffleQuestion() {
    let counter = questions.length;

    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);

        counter--;

        let temp = questions[counter];
        questions[counter] = questions[index];
        questions[index] = temp;
    }
}


