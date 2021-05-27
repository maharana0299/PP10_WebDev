// this is complete at 2 sec
/*
function delayIt() {
    return new Promise(function executor(resolve, reject) {
        setTimeout(() => {
            resolve(2);
        }, 2000);
    })
}

let p = delayIt();

p.then(function(a) {
    console.log(a);
});
*/

// runs parallel
// this will run at 3 sec 
/*
setTimeout(() => {
    p.then(function(a) {
        console.log('after delay');
    })
}, 3000);
*/
// set interval -> to call infinietly
// setInterval(() => {
//     console.log(1);
// }, 1000);

let c = 0;
let id = setInterval(() => {

    if (c == 3) {
        clearInterval(id);
    }
    console.log(c);
    c++;
}, 1000)


// to stop
// clearInterval(id);