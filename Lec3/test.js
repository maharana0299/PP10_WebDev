/*
let a = [
    { name: "Roorkee", rainfall: [5, 6, 5, 5, 4, 7, 8] },
    { name: "Pauri", rainfall: [3, 3, 3, 1, 2, 2, 2] },
];

function rainDance(input) {

    let ans = [];

    for (let i = 0; i < input.length; i++) {

        let json = input[i];
        console.log(json);

        let rainfall = json.rainfall;
        if (rainfall != undefined) {
            let avg = 0;
            rainfall.forEach(element => {
                avg += element;
            });

            avg = avg / rainfall.length;

            let ansJson = {
                name: json.name,
                avgRainfall: avg,
            }

            ans.push(ansJson);
        }
    }

    return ans;
}

console.log(rainDance(a));

*/

/*

// giving default values
function flattenObject(json, res = {}, extrakey = '') {

    for (key in json) {
        if (typeof json[key] != 'object') {
            // if it is not an object then
            //add to result
            res[extrakey + key] = json[key]; // if there is no need to flatten then extrakey will be ''

        } else {
            // flatten it 
            // pass the json[key], result res and updatd key
            flattenObject(json[key], res, `${extrakey}${key}.`)
        }
    }

    // in the end return result;
    return res;
}

let a = {
    newObj: {
        obj2: {
            obj5: {
                one: 1,
            },
        },
    },
    obj3: {
        obj4: { two: 2 },
    },
};


console.log(flattenObject(a));
*/

/*
let arr = [1, 2, 3];
(function() {
    for (x in arr) arr.unshift(arr.pop());
    console.log(arr);
})();

let randomAdder = function(arr = ["a", "b"]) {
    arr[arr.length * arr.length] = arr.length * arr.length;
};
randomAdder(arr);
randomAdder();
console.log(arr[9]);
console.log(arr[8]);
*/

// (function() {
//     if ((-100 && 100 && "0") || [] === true || 0) {
//         console.log(1);
//         if ([] || (0 && false)) {
//             console.log(2);
//         }
//         if (Infinity && NaN && "false") {
//             console.log(3);
//             if ("") {
//                 console.log(4);
//             }
//         } else {
//             console.log(5);
//             if (({} || false === "") && !(null && undefined)) {
//                 console.log(6);
//             }
//         }
//     } else {
//         console.log(7);
//     }
// })();

/*
let a = "This only works if and only if";
let b = a.slice(a.indexOf("only"));
let c = b.lastIndexOf("only");
b[c] = "i";
console.log(a);
console.log(b);
*/

/*
function decToBin(num) {
    let a = 0;
    let power = 1;
    while (num > 0) {

        let rem = num % 2;
        num = Math.floor(num / 2);
        a += rem * power;
        power *= 10;
    }

    return a;
}

console.log(decToBin(45));
*/
/*
let i = 'kite flying';
let ans = spoon(i);
console.log(ans);

function spoon(string) {

    // contins to words
    let words = string.split(" ");
    let i = words[0].charAt(0);
    words[0] = words[1].charAt(0) + words[0].slice(1);
    words[1] = i + words[1].slice(1);

    return words[0] + " " + words[1];
} */

/*

function f() {
    console.log(arguments);
}

function f(a, b) {
    return a + b;
}
console.log(f(2, 3, 4, 5));

function f(x, y, z, t) {
    return x + y + z + t;
}
console.log(f(2, 3, 4, 5));

*/

/*
console.log(a);
f(2, 3, 4, 5);
var a = 1;
var a = 2;
console.log(a);
console.log(b);
let b = 2;

function f() {
    console.log(arguments);
}*/

/*
let obj = { "concept": "" };
console.log(
    JSON.parse(
        JSON.stringify(obj).slice(0, 12) + "JSON" + JSON.stringify(obj).slice(12)
    ).concept
);
console.log(JSON.stringify(obj).slice(0, 12));
*/

/*
let a;
console.log(a);

function A() {
    let a = 2;
    console.log(a);

    function C() {
        console.log(a);

        function D() {
            console.log(a);
            a = 2;
        }
        D();
        a = 3;
    }
    C();
}

function B() {
    let a;
    console.log(a);

    function E() {
        a = 6;
        console.log(a);

    }

    a = 2;
    E();
    console.log(a);
}

function F() {
    console.log(a);
    a = 2;
}
a = 3;
F();
B();
A();

*/

let users = [{
        name: "Rajneesh",
        age: 34,
        address: {
            local: "22 Alaknanda",
            city: "Dehradun",
            state: "UK",
        },
        orders: [{ id: 1, name: "GOT Book Series" }],
    },
    {
        name: "Bhavesh",
        age: 37,
        address: {
            local: "48 DT Row",
            city: "Hyderabad",
            state: "AP",
        },
    },
    {
        name: "Jasbir",
        age: 38,
        address: {
            local: "196 Lama Bhavan",
            city: "Gangtok",
            state: "Sikkim",
        },
        orders: [
            { id: 1, name: "Chair" },
            { id: 2, name: "PS5" },
        ],
    },
];

function updateUsers(users, userObject, item) {

    let isPresent = false;
    let index;

    for (let i = 0; i < users.length; i++) {

        if (users[i].name == userObject.name) {
            isPresent = true;
            index = i;
        }
    }

    if (!isPresent) {

        // if not present 

        // if item is present and orders is not there
        if (item != undefined) {

            userObject.orders = [{ id: 1, name: item }];
        }

        users.push(userObject);
        return users;
    } else if (users[index].orders == undefined && item != undefined) {

        // if orders array is not present and item is not undefined 
        users[index].orders = [{ id: 1, name: item }];
        return users;
    } else if (users[index].orders != undefined && item != undefined) {

        // if value alreay exits return msg 
        let order = users[index].orders;
        for (let i = 0; i < order.length; i++) {

            if (order[i].name === item) {

                // if already existing order then return
                return {
                    msg: "Alreay ordered"
                }
            }
        }

        // if not repeated then add
        order.push({
            id: order.length,
            name: item
        });

        return users;
    }
}
updateUsers(
    users, {
        name: "Rajneesh",
        age: 34,
        address: {
            local: "22 Alaknanda",
            city: "Dehradun",
            state: "UK",
        },
    },
    "GOT Book "
)



updateUsers(users, {
    name: "Ravi",
    age: 24,
    address: {
        local: "25 Iroda",
        city: "Dehradun",
        state: "UK",
    },
})


updateUsers(
    users, {
        name: "Ravi",
        age: 24,
        address: {
            local: "25 Iroda",
            city: "Dehradun",
            state: "UK",
        },
    },
    "Chair"
)

console.log(
    JSON.stringify(users)
);
// console.log(
//     JSON.stringify(
//         updateUsers(
//             users, {
//                 name: "Rajneesh",
//                 age: 34,
//                 address: {
//                     local: "22 Alaknanda",
//                     city: "Dehradun",
//                     state: "UK",
//                 },
//             },
//             "Fan"
//         )
//     )
// );