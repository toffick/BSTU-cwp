function Human(height){
    this.height = height;
}

Human.prototype.getHeight = function (){
    return this.height;
};

//-----------------------------------
//-----------------------------------
//-----------------------------------

function Asian(name, height){
    Human.call(this, height);
    this.name = name;
}

Asian.prototype = Object.create(Human.prototype);
Asian.prototype.getName = function (){
    return this.name;
};

let as1 = new Asian("Nick", 10);
let hu1 = new Asian(10);

console.log(as1.getHeight());
console.log(as1.getName());

function getType(obj, f){

    if (obj instanceof Asian)
        if ((typeof obj[f] === 'function'))
            console.log(1);
}

getType(hu1, 'getName');