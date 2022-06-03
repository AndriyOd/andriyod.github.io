// let gCounter = 0;
let gSelectElemsFromFirstColumn;
// let gTotalSum = 0;

RowAdd();

let plusBtn = document.querySelector('#plus');
plusBtn.addEventListener('click', RowAdd);

let minusBtn = document.querySelector('#minus');
minusBtn.addEventListener('click', RowDelete);

// let refreshBtn = document.querySelector('#refresh-btn');
// refreshBtn.addEventListener('click', CreateSecondCell);

// let select = document.querySelector('#select-1');
// select.onchange = (()=>{console.log('Select element has just changed')});

// let checkbtn = document.querySelector('#check1-btn');
// checkbtn.addEventListener('click', () => {
    // let selectElemsFromFirstColumn = document.querySelectorAll('#tbody > tr > td:first-child > select');
    // console.log(selectElemsFromFirstColumn);
    // console.log('---------');
    // selectElemsFromFirstColumn.forEach((item) => { console.log(item.value) });
// });








function RowAdd() {
    //gCounter++;
    
    // Empty Row Building
    let rColumnArr = [];
    rColumnArr[0] = "";
    rColumnArr[1] = "";
    rColumnArr[2] = "CheckBox";
    rColumnArr[3] = 0;

    let tr = document.createElement('tr');

    rColumnArr.forEach((item, index) => {
        let td = document.createElement('td');
        td.textContent = rColumnArr[index];
        tr.appendChild(td);
    });

    let tbody = document.querySelector('#tbody');
    tbody.appendChild(tr);
    // TotalCalc(); 

    // Put Select Item into the First Cell in a Row
    CreateFirstCell();

    // Create Second Cell (with Option content) in a Row
    let rows = document.querySelectorAll('#tbody > tr');
    CreateSecondCell(rows.length);

    gSelectElemsFromFirstColumn = document.querySelectorAll('#tbody > tr > td:first-child > select');
    gSelectElemsFromFirstColumn.forEach((item) => {
        item.addEventListener('change', (event)=> {
            let changedSelItemNum = event.target.getAttribute('index');
            //console.log(changedSelItemNum);
            CreateSecondCell(changedSelItemNum);
        });
    });
}


function RowDelete() {
    let tbody = document.querySelector('#tbody');
    if (tbody.lastElementChild) tbody.removeChild(tbody.lastElementChild);
    TotalCalc();

    gSelectElemsFromFirstColumn = document.querySelectorAll('#tbody > tr > td:first-child > select');
    console.log(gSelectElemsFromFirstColumn);
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

    cellTotal.textContent = totalSum;
}


function CreateFirstCell() {
    // gCounter++;
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
    // console.log(firstCell);
    firstCell.appendChild(droplist);
}


function CreateSecondCell(num) {
    //console.log('CreateSecondCell function');
    //console.log(num);
    let droplist = document.createElement("select");

    let qfirstSel = `#tbody > tr:nth-child(${num}) > td:first-child`;
    let firstCell = document.querySelector(qfirstSel);

    let qsecondSel = `#tbody > tr:nth-child(${num}) > td:nth-child(2)`;
    let secondCell = document.querySelector(qsecondSel);
    while (secondCell.firstElementChild) {
        secondCell.removeChild(secondCell.firstElementChild);
        secondCell.textContent = "";
    }

    let optionArr = [];

    // console.dir(firstCell.firstChild);
    // console.dir(firstCell.firstChild.value);

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

    // console.log(firstCell);
    secondCell.appendChild(droplist);
}