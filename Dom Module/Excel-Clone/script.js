let rowNumberSection = document.querySelector('.row-number-section');
let coulumnTagSection = document.querySelector('.column-tag-section');
let formulaBarSelectedCellArea = document.querySelector('.selected-cell-div')
let cellSection = document.querySelector('.cell-section');
let formulaInputElement = document.querySelector('.formula-input-section');
// last visited cell
let lastVisitedCell;

let dataObject = {}

for (let i = 1; i <= 100; i++) {
    let div = document.createElement('div');

    div.innerText = i;
    div.classList.add('row-number')
    rowNumberSection.append(div);
}

// Add columns ie 26 headings
for (let i = 0; i < 26; i++) {
    let div = document.createElement('div');
    div.classList.add("column-tag")
    div.innerText = String.fromCharCode(65 + i);

    coulumnTagSection.append(div)
}


// cell section make it scroll
cellSection.addEventListener("scroll", (e) => {
    console.log(e.currentTarget.scrollLeft);
    coulumnTagSection.style.transform = `translateX(-${e.currentTarget.scrollLeft}px)`
    rowNumberSection.style.transform = `translateY(-${e.currentTarget.scrollTop}px)`
});

// for grid elements 
// we are creating individual cell + UI
for (let i = 1; i <= 100; i++) {

    let rowDiv = document.createElement('div');
    rowDiv.classList.add('row');

    for (let j = 0; j < 26; j++) {
        let asciiCode = 65 + j;
        let alpha = String.fromCharCode(asciiCode);

        // eg : A1, A2, B6 etc
        let cellAddress = alpha + i;

        // object 
        dataObject[cellAddress] = {
            value: undefined,
            formula: undefined,
            upstream: [],
            downstream: [],
        };

        let cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-address', cellAddress);
        // to edit 
        cell.contentEditable = true;

        // Whenever we do changes,  it updates
        cell.addEventListener("input", (e) => {

            // get address of cell 
            let currentCellAddress = e.currentTarget.getAttribute('data-address')
            let currentCellObject = dataObject[currentCellAddress];

            // console.log(e.currentTarget.innerText);
            // when we change the value, it gets updated in  our json 
            currentCellObject.value = e.currentTarget.innerText;
            currentCellObject.formula = undefined;

            // loop in my up-stream
            // for each cell in upstream, remove myself from their downstream
            // make my upstream an empty array

            let currentUpStream = currentCellObject['upstream'];

            // console.log(currentUpStream);
            currentUpStream
                .forEach(currUpStreamAddress =>
                    removeFromDownStream(currUpStreamAddress, currentCellAddress));
            currentCellObject['upstream'] = [];

            // next step is to update who is dependent on me 
            let currentDownStream = currentCellObject.downstream;
            currentDownStream
                .forEach(childAddress => updateCell(childAddress));

            // console.log(dataObject['A1'], dataObject['B1']);
        })

        // defines what will happen when we click
        cell.addEventListener('click', (e) => {

            if (lastVisitedCell && lastVisitedCell != e.currentTarget) {
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
    cellSection.append(rowDiv);
}

formulaInputElement.addEventListener("keydown", (e) => {
    if (e.key == 'Enter') {
        // console.log('Evaluation formula');

        // if there is no ell selected, then return
        if (!lastVisitedCell) return;

        let typedFormula = e.currentTarget.value;
        console.log(typedFormula);
        console.log('Not Returned');

        let selectedCellAddress = lastVisitedCell.getAttribute("data-address");
        let selectedCell = dataObject[selectedCellAddress];

        selectedCell.formula = typedFormula;

        let upstream = selectedCell['upstream'];

        upstream
            .forEach(address => removeFromDownStream(address, selectedCellAddress))
        selectedCell['upstream'] = [];
    }
})

// test data 
// dataObject['A1'].value = 20;
// dataObject['A1'].upstream = ['B4']
// dataObject['A1'].downstream = ['B1'];
// dataObject['B1'].formula = '2 * A1 '
// dataObject['B1'].value = 40;
// dataObject['B1'].upstream = ['A1'];

// remove the child from its parent 
// removes the connection btw cells
function removeFromDownStream(parentCellAddress, dependentCellAddress) {

    console.log(parentCellAddress + " = " + dependentCellAddress);

    // fetch parent downstream 
    // remove dependentCell from downstream of parent cell

    let parentCellDownStream = dataObject[parentCellAddress]['downstream'];

    parentCellDownStream = parentCellDownStream.filter((dependent) => dependent != dependentCellAddress);

}


function updateCell(cellAddress) {

    // evaluate the formula using upstream array 
    // update the value of child cell 

    let cell = dataObject[cellAddress];

    // console.log("address" + cellAddress);
    let upstream = cell['upstream'];
    let formula = cell.formula;


    // fetch values of upstream
    let keyValue = {};

    upstream.forEach(address => {
        keyValue[address] = dataObject[address].value
    });

    // for each key value pair, we need to replace the value in formula
    for (let key in keyValue) {
        formula = formula.replace(key, keyValue[key]);
    }

    cell.value = eval(formula);

    // now we have to update the value in ui 
    let cellElement = document.querySelector(`[data-address=${cellAddress}]`)
    cellElement.innerText = cell.value;
    // now do for all childrens
    cell.downstream.forEach(address => updateCell(address));
}