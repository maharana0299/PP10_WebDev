// objects are key value pair

let obj = {
    name: 'Nirbhay',
    age: 21
}

console.log(obj);
let bruce = {
        name: 'Bruce',
        lastName: 'Wayne',
        friends: ['Kal-El', 'Barry Allen', 'Peter'],
        age: 45,
        isAvenger: true,
        abc: undefined,
        address: {
            state: 'New York',
            city: 'Long Island',
        },
        sayHi: function fn() {

            console.log("Boost is the secret of my energy");
            return "It's not who I am underneath, but what I do that defines me.";
        }
    }
    // console.log(bruce);
    // console.log(bruce.friends);
    // console.log(bruce['sayHi']());
    // for (let k in bruce) {
    //     console.log(bruce[k]);
    // }
let karr = Object.keys(bruce);

for (let i = 0; i < karr.length; i++) {
    console.log(bruce[karr[i]]);
} // for delete we use delete keyword
delete bruce.abc;
// console.log(bruce);