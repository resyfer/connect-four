var sideCount = 5;

var columnFillCount = [0, 0, 0, 0, 0];

var colors = ["white", "red", "blue"];

var playerTurn = 1;
var playerTurnDisplay = document.getElementById('player-number');


var boxList = document.getElementsByClassName('box');

var board = [];
var boardDiv = [];
for(let i = 0; i<sideCount; i++) {
  board.push([]);
  boardDiv.push([]);
  for(let j = 0; j<sideCount; j++) {
    board[i][j] = 0;
    boardDiv[i][j] = boxList[(i*sideCount) + j];
  }
}

var choiceList = document.getElementsByClassName('choice');
for(let i = 0; i<choiceList.length; i++) {
  choiceList[i].addEventListener('click', ()=> {
    playerChoice(i);
    //gameWinCondition();
  });
}

function playerChoice(i) {
  if(choiceCheck(i) == 1) {
    turnUpdate(i);
  } else {
    alert("Choice unavailable. Please Try Again!");
  }
}

function choiceCheck(i) {
  if(columnFillCount[i] == sideCount) return 0;
  else return 1;
}

function turnUpdate(i) {
  boardDiv[sideCount - columnFillCount[i] - 1][i].style.backgroundColor = colors[playerTurn];
  board[sideCount - columnFillCount[i] - 1][i] = playerTurn;
  playerTurn = (playerTurn%2) + 1;
  columnFillCount[i]++;
  document.documentElement.style.setProperty('--current-color', colors[playerTurn]);
  playerTurnDisplay.innerHTML = playerTurn;
}

// function gameWinCondition() {

// }