var sideCount = 5;

var columnFillCount = [0, 0, 0, 0, 0];

var colors = ["white", "red", "blue"];

var playerTurn = 1;
var playerTurnDisplay = document.getElementById('player-number');


var boxList = document.getElementsByClassName('box');

var playAgain = document.getElementById('play-again');
playAgain.addEventListener('click', ()=> {
  location.reload();
})

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
  
  let possibleWinner = playerTurn;
  
  playerTurn = (playerTurn%2) + 1;
  columnFillCount[i]++;
  
  document.documentElement.style.setProperty('--current-color', colors[playerTurn]);
  playerTurnDisplay.innerHTML = playerTurn;

  gameWinCondition(possibleWinner);
}

function gameWinCondition(possibleWinner) {
  
  for(let i = 1; i<colors.length; i++) {
    if(checkColor(i)) {
      gameOver(possibleWinner);
      return;
    }
  }
}

function checkColor(i) {
  let row = checkRow(i);
  let column = checkColumn(i);
  let diagonal = checkDiagonal(i);

  if(row || column || diagonal) return true;
  
  return false;
}

function checkRow(i) {
  for(let j = 0; j<board.length; j++) {
    let count = 0;
    for(let k = 0; k<board[0].length; k++) {
      if(board[j][k] == i) {
        count++;
        if(count >= 4) return true;
      } else {
        count = 0;
      }
    }
  }
  return false;
}

function checkColumn(i) {
  for(let j = 0; j<board[0].length; j++) {
    let count = 0;
    for(let k = 0; k<board.length; k++) {
      if(board[k][j] == i) {
        count++;
        if(count >= 4) return true;
      } else {
        count = 0;
      }
    }
  }
  return false;
}

function checkDiagonal(i) {
  return (checkL2RDiagonal(i) || checkR2LDiagonal(i));
}

function checkL2RDiagonal(i) {
  for(let j = 0; j<board[0].length; j++) {
    let count = 0;
    for(let k = 0; j+k<board[0].length; k++) {
      if(board[k][j+k] == i) {
        count++;
        if(count >= 4) return true;
      } else {
        count = 0;
      }
    }
  }
}

function checkR2LDiagonal(i) {
  for(let j = 0; j<board[0].length; j++) {
    let count = 0;
    for(let k = 0; j-k>=0; k++) {
      if(board[k][j-k] == i) {
        count++;
        if(count >= 4) return true;
      } else {
        count = 0;
      }
    }
  }
}

function gameOver(winner) {
  let playerWinner = document.getElementById('player-winner-number');
  let gameOverScreen = document.getElementById('win-screen');
  gameOverScreen.style.display = "block";
  playerWinner.innerHTML = winner;
}