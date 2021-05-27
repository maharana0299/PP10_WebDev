// let num = parseInt(process.argv[2]);

// function add(num) {

//     console.log(num + 2);
// }

// add(num);

function inp(nums) {
    for (let i = 0; i < nums.length; i++) {
        console.log(parseInt(nums[i]));
    }
}
let input = process.argv.splice(2);

inp(input);