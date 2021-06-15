const readline = require('readline');

const rl = readline.Interface({
    input: process.stdin,
    output: process.stdout,
    prompt: "myPrompt>>"
});


rl.prompt();

rl.on('line', (input) => {
    console.log(input);
});
// rl.question("What do you think of node.js ?", (ans) => {
//     console.log(`Thank you for your valuable feedback : ${ans}`);
// })