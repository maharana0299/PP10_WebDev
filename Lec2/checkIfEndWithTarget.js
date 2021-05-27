function confirmEnding(str, target) {
    var targetLength = target.length;
    var sub = str.slice(-targetLength);
    if (sub === target) {
        return true;
    }
    return false;
}

let b = confirmEnding("Bastian", "n");

console.log(b);