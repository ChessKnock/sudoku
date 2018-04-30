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
	alert();
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
	let coordinates;
	let tempNumber;

	for(let i = 0; i < 9; i++) {
		tempNumber = getUniqueNumber(numbers);
		numbers.splice(numbers.indexOf(tempNumber), 1);
		
		for(let j = 1; j <= 9; j + 3) {
			coordinates = getFreeCell(j);
			inputInner(coordinates, tempNumber);
		}
	}
}

// так же выводит те цифры что указаны в параметрах
function getRandomNumber(min, max) {
	return Math.floor(Math.random() * ((max + 1) - min)) + min;
}
// ver 2. вроде лучше но его надо додумать. Можно обойтись и просто строкой но лучше пока подержу в функции
function getUniqueNumber(arr) {
	return arr[getRandomNumber(0, 8 - arr.length)];
}

function getFreeCell(j) {
	let coordinates;
	let tempCell;

	while(true) {
		coordinates = [getRandomNumber(j, j + 2), getRandomNumber(j, j + 2)];
		tempCell = document.querySelector(`.r-${coordinates[0]}_c-${coordinates[1]}`);
		if(!(tempCell.classList.contains("filled"))) {
			tempCell.classList.add("filled");
			return coordinates;
		}

	}
}

function inputInner(coordinates, tempNumber) {
	for(let i = 0; i < 3; i++) {
		document.querySelector(`.r-${coordinates[0]}_c-${coordinates[1]}`).innerHTML = tempNumber;
		coordinates[0] = coordinates[0] % 3 == 0 ? coordinates[0] + 1 : coordinates[0] + 4;
		coordinates[1] = coordinates[1] % 3 == 0 ? coordinates[1] - 2 : coordinates[0] + 1;
	}
}


// ver 1. не нравится что есть бесконечный цикл
// function getUniqueNumber(array) {
//   let temp;
//   while(true) {
//     temp = getRandomNumber(1, 9);
//     if(!(array.indexOf(temp) + 1)) {
//       return temp;
//     }
//   }
// }