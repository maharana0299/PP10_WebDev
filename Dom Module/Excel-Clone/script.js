let rowNumberSection = document.querySelector('.row-number-section');
let coulumnTagSection = document.querySelector('.column-tag-section');
let formulaBarSelectedCellArea = document.querySelector('.selected-cell-div')

// last visited cell
let lastVisitedCell;

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


// for grid elements 

let cellSection = document.querySelector('.cell-section');

for (let i = 1; i <= 100; i++) {

    let rowDiv = document.createElement('div');
    rowDiv.classList.add('row');

    for (let j = 0; j < 26; j++) {
        let asciiCode = 65 + j;
        let alpha = String.fromCharCode(asciiCode);

        // eg : A1, A2, B6 etc
        let cellAddress = alpha + i;

        let cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-address', cellAddress);

        // to edit 
        cell.contentEditable = true;

        cell.addEventListener('click', (e) => {

            if (lastVisitedCell) {
                lastVisitedCell.classList.remove("cell-selected");
            }

            e.currentTarget.classList.add('cell-selected');

            lastVisitedCell = e.currentTarget;

            let currentCellAddress = e.currentTarget.getAttribute("data-address");
            formulaBarSelectedCellArea.innerText = `${currentCellAddress}`;
        });

        // finally appeding
        rowDiv.append(cell);
    }
    console.log('adding');
    cellSection.append(rowDiv);
}