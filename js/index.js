var boxSide = 5;
var colors = ["white", "red", "blue"];

var currentPlayer = 1;

var board = [];
for(let i = 0; i<boxSide; i++) {
  board.push([]);
  for(let j = 0; j<boxSide; j++) board[i][j] = 0;
}

var boxes = document.getElementsByClassName('box');

var boxList = [];
for(let i = 0; i<boxSide; i++) {
  boxList.push([]);
  for(let j = 0; j<boxSide; j++) {
    boxList[i][j] = boxes[(i*boxSide) + j];
    boxList[i][j].style.backgroundColor = colors[0];
    boxList[i][j].addEventListener('click', ()=>{
      playerChoice(i, j);
    });
  }
}

var playerTurn = document.getElementById('player-number');

function playerChoice(i, j) {
  if(checkChoice(i, j) == 1) {
    currentPlayer = (currentPlayer)%(colors.length-1) + 1;
    playerTurn.innerHTML = currentPlayer;
  }
  //gameWinCheck();
}

function checkChoice(i, j) {
  if(boxList[i][j].style.backgroundColor != "white") {
    alert("Place already taken, please try again.");
    return 0;
  } else {
    while(i+1<5 && boxList[i+1][j].style.backgroundColor == "white") i++;
    boxList[i][j].style.backgroundColor = colors[currentPlayer];
    return 1;
  }
}

// function gameWinCheck() {
//   for(let i = 0; i<boxSide; i++) {
//     for(let j = 0; j<boxSide; j++) {

//     }
//   }
// }