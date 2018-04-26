let startBtn = document.getElementById("start-btn");

startBtn.onclick = function() {
  startBtn.setAttribute("hide", null);
  
  for(let temp of document.getElementsByClassName("article-field")) {
    temp.removeAttribute("hide");
  }

  creatCells();
};

function creatCells() {
  let tempRow;
  for(let i = 0; i < 9; i++) {
    tempRow = document.createElement("div");// присваеваем новый елемент

    for(let j = 0; j < 9; j++) {
      tempRow.appendChild(document.createElement("div")).className = `cells r-${i + 1} c-${j + 1}`;
    }
    // добавляем на HTML документ
    document.querySelector("#left-field").appendChild(tempRow).className = `rows row-${i + 1}`;
  }
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * ((max + 1) - min)) + min;
}