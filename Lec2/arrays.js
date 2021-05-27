let arr = [1, 2, 3, 4, 5, 6];
let sub = arr.slice(2);
// console.log(sub);
// arr.splice(1, 3); // deletion
arr.splice(1, 2, 8, 9, 10);
console.log('Array:' + arr);
//add
arr.push(7, 8, 9);
//remove last element
console.log('Pop:' + arr.pop());
// add to starting
arr.unshift(10);
// delete 1st
arr.shift();

console.log('Array : ' + arr);