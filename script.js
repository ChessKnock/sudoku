"use strict";

let startBtn = document.getElementById("start-btn");
let genBtn = document.getElementById("generate-btn");
let swapBtn = document.getElementById("swap-btn");

startBtn.onclick = function() {
	startBtn.setAttribute("hide", null);

	for(let temp of document.getElementsByClassName("article-field")) {
		temp.removeAttribute("hide");
	}
  creationCells();
};

genBtn.onclick = function() {
  let array = createField();
  
  swapBtn.onclick = function() {
    array = swapCells(array, true);
    array = swapCells(array, false);
    fillInTheField(array);
  };
  
  fillInTheField(array);
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

function createField() {
  let numbers = createArray(true);
  let cells = createArray(true);
  let array = createArray(false);
  let tempNumber, tempCell;
  let pointer;
  // заполнение массива числами
  for(let i = 0; i < 9; i++) {
    tempNumber = numbers[getRandomNumber(0, numbers.length)];
    numbers.splice(numbers.indexOf(tempNumber), 1);

    tempCell = cells[getRandomNumber(0, cells.length)];
    cells.splice(cells.indexOf(tempCell), 1);

    pointer = getPointer(tempCell);
    for(let j = 0; j < 3; j++) {
      inputNumber(pointer.row, pointer.column, tempNumber, array);
      pointer.row += 3;
      pointer.column = pointer.column % 3 == 0 ? pointer.column - 2 : pointer.column + 1;
    }
  }
  return array;
}

// max олжен быть на 1 больше чем желаемый max иначе будет на 1 меньше!
function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function inputNumber(row, column, tempNumber, mass) {
  for(let i = 0; i < 3; i++) {
    mass[row-1][column - 1] = tempNumber;
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
  } else { 
    if(tempCell > 1 &&  tempCell <= 2) {
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
// выбор между заполнением цифрами и массивами
function createArray(bool) {
  let array = [];
  if(bool) {
    for(let i = 0; i < 9; i++) {
      array.push(i+1);
    }
  } else {
    for(let i = 0; i < 9; i++) {
      array.push([]);
    }
  }
  return array;
}
// из массива в HTML элемент
function fillInTheField(array) {
  for(let i = 0; i < 9; i++) {
    for( let j = 0; j < 9; j++) {
      document.querySelector(`.r-${i+1}_c-${j+1}`).innerHTML = array[i][j];
    }
  }
}
// переделать нахер что бы меняло по две строки а не по три.
function swapCells(array, rowsOrColumn) {
  let lengthOfChanges =  getRandomNumber(6, 10);
  let arrCells;
  let ranBlock, ranCellFirst, ranCellSecond;

  for(let i = 0; i < lengthOfChanges; i++) {
    arrCells = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
    ranBlock = getRandomNumber(0, arrCells.length);
    ranCellFirst = arrCells[ranBlock][getRandomNumber(0, arrCells[ranBlock].length)];
    arrCells[ranBlock].splice(arrCells[ranBlock].indexOf(ranCellFirst), 1);
    ranCellSecond = arrCells[ranBlock][getRandomNumber(0, arrCells[ranBlock].length)];
    
    if(rowsOrColumn) {
      for(let j = 0; j < 9; j++) {
        array[ranCellFirst][j] = array[ranCellFirst][j] + array[ranCellSecond][j];
        array[ranCellSecond][j] = array[ranCellFirst][j] - array[ranCellSecond][j];
        array[ranCellFirst][j] = array[ranCellFirst][j] - array[ranCellSecond][j];
      }
    } else {
      for(let j = 0; j < 9; j++) {
        array[j][ranCellFirst] = array[j][ranCellFirst] + array[j][ranCellSecond];
        array[j][ranCellSecond] = array[j][ranCellFirst]- array[j][ranCellSecond];
        array[j][ranCellFirst] = array[j][ranCellFirst] - array[j][ranCellSecond];
      }
    }   
  }
  return array;
}