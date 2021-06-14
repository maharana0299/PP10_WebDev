// const arr = [1, 2, 4, 3, 2, 3];

// function impure(oarr) {
//     let arr = [...oarr];
//     for (let x in arr) {
//         console.log(arr[x]);
//     }
// }

// impure(arr);

// functions and arguments 

function f(a, b) {

    if (arguments.length == 2) {
        return a * b;
    } else if (arguments.length == 1) {

        // do somthing
        return (x) => (x * a);
    }
    // console.log(arguments);
}

f(2, 3);

//closeures

function g() {
    let a = 1;

    // func 2
    return function(x) {
        return x + a;
    };
}

// output will be 2 
// coz g() is already called and stored in someGFun 
// so when it is called, then it call the function 2 which is returned
// g() doesnt get deleted even if its work is done, it is stored in closure context
let someGFun = g();
console.log(someGFun(1)); // eq to g()(2)
console.log(g()(10));

console.log(f(2)(4));