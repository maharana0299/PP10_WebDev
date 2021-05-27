function findFirstAndLast(arr, a) {
    let f = null,
        l = null;
    let i = 0,
        j = arr.length - 1;

    while (i < arr.length) {
        if (f == null && arr[i] == a) {
            f = i;
        }
        if (l == null && arr[j] == a) {
            l = j;
        }

        if (f != null && l != null)
            break;

        i++;
        j--;
    }

    return {
        "first": f,
        "last": l,
    }
}
let arr = [1, 2, 4, 5, 1, 4, 2, 1, 34, 1, 1, 2, 43, 1, 2, 4];

console.log(findFirstAndLast(arr, 1));