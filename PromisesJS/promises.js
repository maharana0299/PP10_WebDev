let fs = require('fs');

/*
// promise is an object 
let p = new Promise(function executor(resolve, reject) {
    // if task is sucessful then call resolve
    fs.readFile('f.txt', function(err, data) {
            if (err) reject(err);
            else resolve(data);
        })
        // if faliure then call reject
})

// if task is completed and rsolved
p.then(function(data) {
    console.log("Data is recieved");
    console.log(data + "");
}).catch(function(err) {
    // if any error occured
    // passing the value of reject
    console.log(err);
})

*/

function filePath(path) {
    return new Promise(function executor(resolve, reject) {
        fs.readFile(path, function(err, data) {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

function later(data) {
    console.log(data + '');
}

/*
let p1 = filePath('f.txt');
let p2 = filePath('f2.txt');
let p3 = filePath('f3.txt');

// there order varies
p1.then(later);
p2.then(later);
p3.then(later);

*/

// chaining of promises -> async sequential
let p1 = filePath('f.txt');
/*
p1.then(function(data) {
        console.log(data + "");
        let p2 = filePath('f2.txt');
        return p2;
    })
    .then(function(data) {
        console.log(data + "");
        let p3 = filePath('f3.txt');
        return p3;
    })
    .then(function(data) {
        console.log(data + "");
    })
    .catch(function(err) {
        console.log(err);
    }) 
*/

// can call p.then multiple times
// all run in sequential order
p1.then(function(data) {
    console.log(data + '');
})

p1.then(function() {
    console.log('After p1 is completed');
})

p1.then(function() {
    console.log('Here we are again doing some other tasks after completion of p1');
});


// then will return promise or can return anything 
p1.then(function(data) {
        console.log(data + '');
    }).then(function() {
        console.log('After p1 is completed');
    })
    .then(function() {
        console.log('Here we are again doing some other tasks after completion of p1');
    })
    .then(function() {
        console.log('I will retrun something');
        return "I am returned"
    })
    .then(function(s) {
        console.log(s);
    })