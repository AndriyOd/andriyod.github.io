let gCounter=0;
// let gTotalSum = 0;

let plusBtn = document.querySelector('#plus');
plusBtn.addEventListener('click', RowAdd);

let minusBtn = document.querySelector('#minus');
minusBtn.addEventListener('click', RowDelete);

function RowAdd() {
    gCounter++;
    // Row building
    let rColumnArr = [];
    rColumnArr[0] = "Poster_" + gCounter.toString();
    rColumnArr[1] = "A3" + gCounter.toString();
    rColumnArr[2] = "Yes" + gCounter.toString();
    rColumnArr[3] = 50 + gCounter;

    let tr = document.createElement('tr');

    rColumnArr.forEach((item, index) => {
        let td = document.createElement('td');
        td.textContent = rColumnArr[index];
        tr.appendChild(td);
    });

    let tbody = document.querySelector('#tbody');
    tbody.appendChild(tr);
    TotalCalc(); 
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
        for (let i = 0; i < priceCellArr.length; i++)
        {
            totalSum+= Number(priceCellArr[i].textContent);
        }
    }
    
    cellTotal.textContent = totalSum;   
}