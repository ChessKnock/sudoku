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
  let mass = createField();
  
  swapBtn.onclick = function() {
    mass = swapCells(mass, [0, 1, 2], 3, true);
    // mass = swapCells(mass, [0, 3, 6], 1, true);
    // mass = swapCells(mass, [0, 3, 6], 1, false);
    fillInTheField(mass);
  };
  
  fillInTheField(mass);
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
  let numbers = createMass(true);
  let cells = createMass(true);
  let mass = createMass(false);
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
      inputNumber(pointer.row, pointer.column, tempNumber, mass);
      pointer.row += 3;
      pointer.column = pointer.column % 3 == 0 ? pointer.column - 2 : pointer.column + 1;
    }
  }
  return mass;
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
function createMass(bool) {
  let mass = [];
  if(bool) {
    for(let i = 0; i < 9; i++) {
      mass.push(i+1);
    }
  } else {
    for(let i = 0; i < 9; i++) {
      mass.push([]);
    }
  }
  return mass;
}
// из массива в HTML элемент
function fillInTheField(mass) {
  for(let i = 0; i < 9; i++) {
    for( let j = 0; j < 9; j++) {
      document.querySelector(`.r-${i+1}_c-${j+1}`).innerHTML = mass[i][j];
    }
  }
}

function swapCells(mass, arrCells, step, swapRows) {
  let lengthOfChanges =  1;//getRandomNumber(3, 6);
  let randomCell, firstChoice, secondChoice;
  ;

  for(let i = 0; i < lengthOfChanges; i++) {
    randomCell = arrCells[getRandomNumber(0, 3)];
    for(let j = 0; j < 9; j++) {
      if(swapRows)  {
        mass[randomCell][j] = mass[randomCell][j] + mass[randomCell + step][j] + mass[randomCell + (step * 2)][j];
      } else {
        mass[j][randomCell] = mass[j][randomCell] + mass[j][randomCell + step] + mass[j][randomCell + (step * 2)];
      }
    }     

    if(true) {
      firstChoice = randomCell + step;
      secondChoice = randomCell + (step * 2);
    } else {
      firstChoice = randomCell + (step * 2);
      secondChoice = randomCell + step;
    }
    
    for(let j = 0; j < 9; j++) {
      if(swapRows) {
        mass[firstChoice][j] = mass[randomCell][j] - mass[firstChoice][j];
        mass[randomCell][j] = mass[randomCell][j] - mass[firstChoice][j];
      } else {
        mass[j][firstChoice] = mass[j][randomCell] - mass[j][firstChoice];
        mass[j][randomCell] = mass[j][randomCell] - mass[j][firstChoice];
      }
    }
    
    for(let j = 0; j < 9; j++) {
      if(swapRows) {
        mass[secondChoice][j] = mass[firstChoice][j] - mass[secondChoice][j];
        mass[firstChoice][j] = mass[firstChoice][j] - mass[secondChoice][j];
      } else {
        mass[j][secondChoice] = mass[j][firstChoice] - mass[j][secondChoice];
        mass[j][firstChoice] = mass[j][firstChoice] - mass[j][secondChoice];
      }
    }
  }
  return mass;
}