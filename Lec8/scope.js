// let hasblock scope
// var has function scope

// a = 5;

{
    var b = 9;
    a = 5;
    a = a + 5;
    console.log(a);
}

console.log(a);
console.log(b); // can acess b

function fun() {
    var c = 10; // functional scope
    console.log(c);
}

console.log(m);