let a = [2, 5, 3, 5, 2, 6, 1, 6, 9, 12, 34, 2, 1];

function findLargestAndSmalles(arr) {
    let min = Number.MAX_SAFE_INTEGER;
    let max = Number.MIN_SAFE_INTEGER;
    for (let i = 0; i < arr.length; i++) {
        max = Math.max(max, arr[i]);
        min = Math.min(min, arr[i]);
    }

    return { 'max': max, 'min': min };
}
console.log(findLargestAndSmalles(a));
console.log(findFirstIndex(a, 1));

function findFirstIndex(arr, a) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == a)
            return i;
    }

    return -1;
}