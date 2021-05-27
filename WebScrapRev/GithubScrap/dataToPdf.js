const fs = require('fs');
const { jsPDF } = require("jspdf");

const doc = new jsPDF();

let file = fs.readFileSync('./data.json');
file = JSON.parse(file);

let x = 10;
let y = 10;
for (let k in file) {
    doc.text(k.toString(), x, y);
    y += 10;
}

doc.save("a4.pdf");