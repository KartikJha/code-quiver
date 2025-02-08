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

// Array.prototype.customMap = function(callback) {
//     const that = new Array(...this);
//     console.log(this === that);
//     for (i = 0; i < that.length; i++) {
//         that[i] = callback(that[i], i);
//     }
//     return that;
// }



// const a = new Array(1, 2, 3, 4);

// console.log(a.customMap((e) => 2 * e));


//a.map()

/**
 * undefined
 */


/**
 * 2
 * Hello from promise
 * 
 */


function createCounter() {
    let count = 0;

    function increment() {
        count++;
        return count;
    }

    function decrement() {
        count--;
        return count;
    }

    function reset() {
        count = 0;
        return count;
    }

    return {
        increment,
        decrement,
        reset,
    }
}

// const counter = createCounter();
// console.log(counter.increment()); // 1
// console.log(counter.increment()); // 2
// console.log(counter.decrement()); // 1
// console.log(counter.reset());  



// console.log('Start');

// setTimeout(() => {
//   console.log('Timeout 1');
// }, 0);

// Promise.resolve().then(() => {
//   console.log('Promise 1');
// });

// console.log('End');


// function dino(callback, delay) {
//     let timerId;

//     return function () {
//         if (timerId) {
//             clearTimeout(timerId);
//         }
//         timerId = setTimeout(() => {
//             callback();
//             clearTimeout(timerId);
//         }, delay);
//     }
// }

// const log = dino(() => console.log('Debounced!'), 300);
// log();
// log();
// log(); // Only the last call logs after 300ms

function sequentialPromiseChaining(tasks, initialVal) {
    for (let i = 0; i < tasks.length; i++) {
        initialVal = tasks[i](initialVal);
    }
}