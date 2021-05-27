let n = 'I am Iron Man';
console.log(n);

let stringArray = n.split(' ');

console.log(stringArray);
let biggest = stringArray[0].length;
for (let index = 0; index < stringArray.length; index++) {

    if (stringArray[index].length > biggest) {
        biggest = stringArray[index].length;
    }
}

console.log(`Biggest: ` + biggest);