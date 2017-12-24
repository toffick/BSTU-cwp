
const Promise = require('bluebird');
const fs = require('fs');
const filmsJsonPath = './content/films.json';

const writeFilmsToFile = (films) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            fs.writeFile(filmsJsonPath, JSON.stringify(films), (err) => {
                if (!err) resolve();
            });
        }, 60000);
    });
};

const saver = async (films) => {
    while (true) {
        await writeFilmsToFile(films);
    }
};

module.exports = saver;