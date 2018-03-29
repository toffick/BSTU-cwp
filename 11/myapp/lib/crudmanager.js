const genId = require('./genid');
const worker = require('./saver');
const Saver = require('./saver');

class CrudManager {
    constructor(items, order, savePath){
        this.order = order;
        this.items = items || [];
        this.saver = new Saver(this.items, savePath);
        this.saver.saver();
    }

    getFilmById(id){
        return this.items.find(x => x.id == id);
    }

    getFilmIndexById(id){
        let item = this.getFilmById(id);
        return this.items.indexOf(item);
    }

    getAll(){
        return this.items
    }

    create(data){
        data.id = genId();
        this.items.push(data);
        this.makeFilmPosition();
        return data;
    }

    update(data){
        let ind = this.getFilmIndexById(data.id);
        if (ind !== -1) {
            let item = this.items[ind];
            for (let prop in data)
                item[prop] = data[prop];
            this.makeFilmPosition();
            return item;
        }
        else
            return null;

    }

    delete(id){
        let ind = this.getFilmIndexById(id);
        let item = this.items[ind];
        if (ind !== -1) {
            this.items.splice(ind, 1);
            this.makeFilmPosition();
            return item;
        }
        else
            return null;
    }


    makeFilmPosition(){
        this.sortBy();
        this.normalizeFilmsPosition();
    }

    sortBy(){
        this.items.sort((a, b) => b[this.order] - a[this.order]);
    }

    normalizeFilmsPosition(){
        for (let i = 0; i < this.items.length; i++) {
            this.items[i].position = i;
        }
    }

}


module.exports = CrudManager;