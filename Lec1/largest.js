let a = 5,
    b = 10,
    c = 100;
let smallest = a;

if (smallest > b)
    smallest = b;
if (smallest > c)
    smallest = c;

console.log("Smallest :" + smallest);