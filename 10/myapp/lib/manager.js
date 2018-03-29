const films = require('../content/films.json');
const genId = require('./genid');
const worker = require('./saver');

class Manager {
    constructor(){
        this.films = films || [];
        worker(this.films);
    }

    getFilmById(id){
        return this.films.find(x => x.id == id);
    }

    getFilmIndexById(id){
        let film = this.getFilmById(id);
        return this.films.indexOf(film);
    }

    getAll(){
        return this.films
    }

    create(data){
        data.id = genId();
        this.films.push(data);
        this.makeFilmPosition();
        return data;
    }

    update(data){
        let ind = this.getFilmIndexById(data.id);
        if (ind !== -1) {
            let film = this.films[ind];
            for (let prop in data)
                film[prop] = data[prop];
            this.makeFilmPosition();
            return film;
        }
        else
            return null;

    }

    delete(id){
        let ind = this.getFilmIndexById(id);
        let film = this.films[ind];
        if (ind !== -1) {
            this.films.splice(ind, 1);
            this.makeFilmPosition();
            return film;
        }
        else
            return null;
    }



    makeFilmPosition(){
        this.sortByRating();
        this.normalizeFilmsPosition();
    }

    sortByRating(){
        this.films.sort((a, b) => b.rating - a.rating);
    }

    normalizeFilmsPosition(){
        for (let i = 0; i < this.films.length; i++) {
            this.films[i].position = i;
        }
    }

}


module.exports = Manager;