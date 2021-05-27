let fs = require('fs');

// callbacks are not used due to inversion of control and hard to maintain

console.log(1);

function Task(path, operation) {

    fs.readFile(path, operation);
}

console.log(2);

function operation(err, data) {
    console.log(data.toString());
}

console.log(3);

Task('f.txt', operation);

console.log(4);