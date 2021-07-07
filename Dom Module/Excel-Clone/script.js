let rowNumberSection = document.querySelector('.row-number-section');
let coulumnTagSection = document.querySelector('.column-tag-section');

for (let i = 1; i <= 100; i++) {
    let div = document.createElement('div');

    div.innerText = i;
    div.classList.add('row-number')
    rowNumberSection.append(div);
}

// Add columns
for (let i = 0; i < 26; i++) {
    let div = document.createElement('div');
    div.classList.add("column-tag")
    div.innerText = String.fromCharCode(65 + i);

    coulumnTagSection.append(div)
}