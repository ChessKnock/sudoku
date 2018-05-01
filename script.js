"use strict";

let startBtn = document.getElementById("start-btn");
let genBtn = document.getElementById("generate-btn");

startBtn.onclick = function() {
	startBtn.setAttribute("hide", null);

	for(let temp of document.getElementsByClassName("article-field")) {
		temp.removeAttribute("hide");
	}
	creationCells();
};

genBtn.onclick = function() {
  fName();
};

function creationCells() {
	let tempRow;
	for(let i = 0; i < 9; i++) {
		tempRow = document.createElement("div");// присваеваем новый елемент

		for(let j = 0; j < 9; j++) {
			tempRow.appendChild(document.createElement("div")).className = `cells r-${i + 1}_c-${j + 1}`;
		}
		// добавляем на HTML документ, может и не надо обьявлять класс с номером строки
		document.querySelector("#left-field").appendChild(tempRow).className = `rows row-${i + 1}`;
	}
}

function fName() {
  let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let cells = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let tempNumber, tempCell;
  let pointer;

  for(let i = 0; i < 9; i++) {
    tempNumber = numbers[getRandomNumber(0, numbers.length)];
    numbers.splice(numbers.indexOf(tempNumber), 1);

    tempCell = cells[getRandomNumber(0, cells.length)];
    cells.splice(cells.indexOf(tempCell), 1);

    pointer = getPointer(tempCell);
    alert(cells);
    for(let j = 0; j < 3; j++) {
      inputNumber(pointer.row, pointer.column, tempNumber);
      pointer.row += 3;
      pointer.column = pointer.column % 3 == 0 ? pointer.column - 2 : pointer.column + 1;
    }


  }
}
// max олжен быть на 1 больше чем желаемый max иначе будет на 1 меньше!
function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function inputNumber(row, column, tempNumber) {
  for(let i = 0; i < 3; i++) {
    document.querySelector(`.r-${row}_c-${column}`).innerHTML = tempNumber;
    row = row % 3 == 0 ? row - 2 : row + 1;
    column = column % 3 == 0 ? column + 1 : column + 4;
  }
}

function getPointer(tempCell) {
  let row, column;
  
  tempCell /= 3;
  if(tempCell <= 1){    
    row = 1;
    column = Math.floor((tempCell / 3) * 10)
    return {row: row, column: column};
  } else { if(tempCell > 1 &&  tempCell <= 2) {
    row = 2;
    column = Math.floor(((tempCell - 1) / 3) * 10);
    return {row: row, column: column};
  } else {
    row = 3;
    column = Math.floor(((tempCell - 2) / 3) * 10);
    return {row: row, column: column};
  }
  }
}