// const a = new Promise((res, rej) => {
//     res(2);
//     setTimeout(() => {
//         console.log('Hello from promise')
//         res(true);
//     }, 3000);
// })

// a.then((val) => {
//    console.log(val); 
// });

// function printSomething() {
//     return "hello"
// }

// const p = console.log;

// new Promise((X, Y) => {
//     setTimeout(X, 5000, printSomething.toString());
// }).then(p);

Array.prototype.customMap = function(callback) {
    const that = new Array(...this);
    console.log(this === that);
    for (i = 0; i < that.length; i++) {
        that[i] = callback(that[i], i);
    }
    return that;
}



const a = new Array(1, 2, 3, 4);

console.log(a.customMap((e) => 2 * e));


//a.map()

/**
 * undefined
 */


/**
 * 2
 * Hello from promise
 * 
 */
