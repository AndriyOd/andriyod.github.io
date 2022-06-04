let gSelectElemsFromFirstColumn;
let gSelectElemsFromSecondColumn;
let gSelectElemsFromThirdColumn;

RowAdd();

let plusBtn = document.querySelector('#plus');
plusBtn.addEventListener('click', RowAdd);

let minusBtn = document.querySelector('#minus');
minusBtn.addEventListener('click', RowDelete);

let popupWindowOK = document.querySelector('#ok-btn');
let popupWindowX = document.querySelector('#X');

popupWindowOK.addEventListener('click', ClosePopupWindow);
popupWindowX.addEventListener('click', ClosePopupWindow);

function ClosePopupWindow() {
    document.querySelector('#popup-background').classList.remove('active');
    document.querySelector('#popup-window').classList.remove('active');
}


function RowAdd() {
    let rows = document.querySelectorAll('#tbody > tr');
    if (rows.length == 8) {
        // alert('Number of tasks is 5');
        document.querySelector('#popup-background').classList.add('active');
        document.querySelector('#popup-window').classList.add('active');
        return;
    }

    // Empty Row Building
    let rColumnArr = [];
    rColumnArr[0] = "";
    rColumnArr[1] = "";
    rColumnArr[2] = "";
    rColumnArr[3] = 0;

    let tr = document.createElement('tr');

    rColumnArr.forEach((item, index) => {
        let td = document.createElement('td');
        td.textContent = rColumnArr[index];
        tr.appendChild(td);
    });

    let tbody = document.querySelector('#tbody');
    tbody.appendChild(tr);

    // Put Select Item into the First Cell in a Row
    CreateFirstCell();

    // Create Second Cell in a Row (with Option content) 
    // let rows = document.querySelectorAll('#tbody > tr');
    rows = document.querySelectorAll('#tbody > tr');
    CreateSecondCell(rows.length);

    // Create Third Cell in a Row (with CheckBox)
    CreateThirdCell(rows.length);

    // Create Fourth Cell in a Row (with Price Value)
    CreateFourthCell(rows.length);

    // Update Collection of Select-Items from the First Column
    UpdateFirstColumnListeners();

    // Update Collection of Select-Items from the Second Column
    UpdateSecondColumnListeners();

    // Update Collection of CheckBox-Items from the Third Column
    UpdateThirdColumnListeners();
}



function RowDelete() {
    let tbody = document.querySelector('#tbody');
    if (tbody.lastElementChild) tbody.removeChild(tbody.lastElementChild);
    TotalCalc();
}



function TotalCalc() {
    let totalSum = 0;
    let priceCellArr = document.querySelectorAll('#tbody > tr > td:nth-child(4)');
    let cellTotal = document.querySelector('#tfoot > tr > td:nth-child(4)');

    if (priceCellArr.length > 0) {
        for (let i = 0; i < priceCellArr.length; i++) {
            totalSum += Number(priceCellArr[i].textContent);
        }
    }

    cellTotal.textContent = totalSum + " \u{20AC}";
}



function CreateFirstCell() {
    let droplist = document.createElement("select");
    let rows = document.querySelectorAll('#tbody > tr');
    droplist.setAttribute("index", rows.length);

    let optionArr = [];
    optionArr[0] = "Poster";
    optionArr[1] = "Business Card";
    optionArr[2] = "Flyer";
    optionArr[3] = "Infographic";
    optionArr[4] = "Logo";
    optionArr[5] = "Packaging";
    optionArr[6] = "Menu";
    optionArr[7] = "Invitation Card";

    optionArr.forEach((item, index) => {
        let option = document.createElement("option");
        option.textContent = optionArr[index];
        droplist.appendChild(option);
    });

    let firstCell = document.querySelector('#tbody > tr:last-child > td:first-child');
    firstCell.appendChild(droplist);
}



function CreateSecondCell(num) {

    let droplist = document.createElement("select");

    droplist.setAttribute("index", num);

    let qfirstSel = `#tbody > tr:nth-child(${num}) > td:first-child`;
    let firstCell = document.querySelector(qfirstSel);

    let qsecondSel = `#tbody > tr:nth-child(${num}) > td:nth-child(2)`;
    let secondCell = document.querySelector(qsecondSel);
    while (secondCell.firstElementChild) {
        secondCell.removeChild(secondCell.firstElementChild);
        secondCell.textContent = "";
    }

    let optionArr = [];

    switch (firstCell.firstChild.value) {
        default:
        case "Poster":
            secondCell.append("Poster size: ");
            optionArr[0] = "A4";
            optionArr[1] = "A3";
            optionArr[2] = "A2";
            optionArr[3] = "A1";
            optionArr[4] = "A0";
            break;

        case "Business Card":
            secondCell.append("Number of sides: ");
            optionArr[0] = "One-sided";
            optionArr[1] = "Two-sided";
            break;

        case "Flyer":
            secondCell.append("Flyer size: ");
            optionArr[0] = "A5, one-sided";
            optionArr[1] = "A5, two-sided";
            optionArr[2] = "Folded";
            break;

        case "Infographic":
            secondCell.append("Layout size: ");
            optionArr[0] = "A4";
            optionArr[1] = "A3";
            optionArr[2] = "A2";
            break;

        case "Logo":
            secondCell.append("Type: ");
            optionArr[0] = "Text decoration";
            optionArr[1] = "Text + Image";
            break;

        case "Packaging":
            secondCell.append("Box size: ");
            optionArr[0] = "< 10 x 10 x 5 cm";
            optionArr[1] = "< 20 x 20 x 10 cm";
            optionArr[2] = "< 30 x 30 x 20 cm";
            optionArr[3] = "> 30 x 30 x 20 cm";
            break;

        case "Menu":
            secondCell.append("Number of pages: ");
            optionArr[0] = "1-4";
            optionArr[1] = "5-10";
            optionArr[2] = "11-20";
            optionArr[3] = "> 20";
            break;

        case "Invitation Card":
            secondCell.append("Number of sides: ");
            optionArr[0] = "One-sided";
            optionArr[1] = "Two-sided";
    }

    optionArr.forEach((item, index) => {
        let option = document.createElement("option");
        option.textContent = optionArr[index];
        droplist.appendChild(option);
    });

    secondCell.appendChild(droplist);
    UpdateSecondColumnListeners();
}



function CreateThirdCell(num) {
    let qfirstSel = `#tbody > tr:nth-child(${num}) > td:first-child`;
    let firstCell = document.querySelector(qfirstSel);

    let qthirdSel = `#tbody > tr:nth-child(${num}) > td:nth-child(3)`;
    let thirdCell = document.querySelector(qthirdSel);

    // All Cell's Children Deleting
    while (thirdCell.firstElementChild) {
        thirdCell.removeChild(thirdCell.firstElementChild);
        thirdCell.textContent = "";
    }

    // CheckBox container creating with input and label children
    let checkboxContainer = document.createElement("DIV");
    checkboxContainer.classList.add('checkbox-container');    
    
    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("index", num);
    let checkboxID = `chb${num}`;
    checkbox.setAttribute("id", checkboxID);

    let checkboxLabel = document.createElement("LABEL");
    checkboxLabel.setAttribute("for", checkboxID);

    checkboxContainer.append(checkbox);
    checkboxContainer.append(checkboxLabel);
    // CheckBox container created

    switch (firstCell.firstChild.value) {
        default:
        case "Poster":
        case "Flyer":
        case "Menu":
        case "Invitation Card":
            // thirdCell.append(checkbox);
            checkboxLabel.textContent = " .PSD";
            break;

        case "Business Card":
        case "Infographic":
        case "Logo":
        case "Packaging":
            // thirdCell.append(checkbox);
            checkboxLabel.textContent = " .SVG";
    }

    thirdCell.append(checkboxContainer);
    UpdateThirdColumnListeners();
}



function CreateFourthCell(num) {
    let qfirstSel = `#tbody > tr:nth-child(${num}) > td:first-child > select`;
    let firstElem = document.querySelector(qfirstSel);

    let qsecondSel = `#tbody > tr:nth-child(${num}) > td:nth-child(2) > select`;
    let secondElem = document.querySelector(qsecondSel);

    let qthirdSel = `#tbody > tr:nth-child(${num}) > td:nth-child(3) > div > input`;
    let thirdElem = document.querySelector(qthirdSel);

    let qfourthSel = `#tbody > tr:nth-child(${num}) > td:nth-child(4)`;
    let fourthCell = document.querySelector(qfourthSel);

    let basePrice = 0;

    switch (firstElem.value) {
        default:
        case "Poster":
            basePrice = 10;
            break;
        case "Business Card":
            basePrice = 5;
            break;
        case "Flyer":
            basePrice = 5;
            break;
        case "Infographic":
            basePrice = 5;
            break;
        case "Logo":
            basePrice = 5;
            break;
        case "Packaging":
            basePrice = 10;
            break;
        case "Menu":
            basePrice = 5;
            break;
        case "Invitation Card":
            basePrice = 5;
    }

    let koef_1 = secondElem.selectedIndex / 2 + 1;
    let koef_2 = 1;
    if (thirdElem.checked) koef_2 = 1.3;
    let price = basePrice * koef_1 * koef_2;
    fourthCell.textContent = price;
    TotalCalc();
}



function UpdateFirstColumnListeners() {
    gSelectElemsFromFirstColumn = document.querySelectorAll('#tbody > tr > td:first-child > select');
    gSelectElemsFromFirstColumn.forEach((item) => {
        item.addEventListener('change', (event) => {
            let changedSelItemNum = event.target.getAttribute('index');
            CreateSecondCell(changedSelItemNum);
            CreateThirdCell(changedSelItemNum);
            CreateFourthCell(changedSelItemNum);
        });
    });
}


function UpdateSecondColumnListeners() {
    gSelectElemsFromSecondColumn = document.querySelectorAll('#tbody > tr > td:nth-child(2) > select');
    gSelectElemsFromSecondColumn.forEach((item) => {
        item.addEventListener('change', (event) => {
            let changedSelItemNum = event.target.getAttribute('index');
            CreateFourthCell(changedSelItemNum);
        });
    });
}


function UpdateThirdColumnListeners() {
    gSelectElemsFromThirdColumn = document.querySelectorAll('#tbody > tr > td:nth-child(3) > div > input');
    gSelectElemsFromThirdColumn.forEach((item) => {
        item.addEventListener('change', (event) => {
            let changedSelItemNum = event.target.getAttribute('index');
            CreateFourthCell(changedSelItemNum);
        });
    });
}