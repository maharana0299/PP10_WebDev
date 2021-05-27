function convertToBinary(num) {
    let dec = '';
    while (num > 0) {
        dec = num % 2 + dec;
        num = Math.floor(num / 2);
    }

    return dec;
}

let a = convertToBinary(7);

console.log(a);