function foo(a){
    var stor;
    return a ? function (b){
            return function (c){
                switch (c) {
                    case '+':
                        stor = +a + +b;
                        return stor;
                    case '*':
                        stor = +a * +b;
                        return stor;
                }
            }
        } :
        function (){
            return stor;
        };
}


console.log(foo('4')('5')('+'));

console.log(foo();


// bar('4')('8') =>  14
// bar() => 14
// => 9