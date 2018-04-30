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
  fillingTheField();
  clearFilled();
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

function fillingTheField() {
  let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let pointer;
  let tempNumber;

	for(let i = 0; i < 9; i++) {
    tempNumber = getUniqueNumber(numbers);
    numbers.splice(numbers.indexOf(tempNumber), 1);
    pointer = { row: 0, column: 0, amountCol: [1, 2, 3] };

		for(let j = 1; j < 9; j+=3) {
      checkFreeCell(j, pointer);
      inputInner(pointer, tempNumber);
		}
  }
  
}

// max олжен быть на 1 больше чем желаемый max иначе будет на 1 меньше!
function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}
// Можно обойтись и просто строкой но лучше пока подержу в функции
function getUniqueNumber(arr) {
	return arr[getRandomNumber(0, arr.length)];
}

function checkFreeCell(j, pointer) {
	let tempCell;

	while(true) {
    pointer.column = pointer.amountCol[getRandomNumber(0, pointer.amountCol.length)];
    pointer.row = getRandomNumber(j, j + 3);

		tempCell = document.querySelector(`.r-${pointer.row}_c-${pointer.column}`);
		if(!(tempCell.classList.contains("filled"))) {
      pointer.amountCol.splice(pointer.amountCol.indexOf(pointer.column), 1);
      tempCell.classList.add("filled");
			break;
		}
	}
}

function inputInner(pointer, tempNumber) {
	for(let i = 0; i < 3; i++) {
		document.querySelector(`.r-${pointer.row}_c-${pointer.column}`).innerHTML = tempNumber;
		pointer.column = pointer.column % 3 === 0 ? pointer.column + 1 : pointer.column + 4;
		pointer.row = pointer.row % 3 === 0 ? pointer.row - 2 : pointer.row + 1;
	}
}
// странно когда в коллекции один элемент теряет класс .filled, то он удаляется из нее
// следовательно и length уменьшается и надо выводить количество в отдельную переменную
function clearFilled() {
  let elems = document.getElementsByClassName("filled");
  let length = elems.length; 
  for (let i = 0; i < length; i++) {
    elems[0].classList.toggle("filled");                  
  }
}
