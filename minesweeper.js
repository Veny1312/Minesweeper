var board = [];
var rows = 10;
var colums = 10;
var clickedTile = 0;

var mines = 5;
var minesLocation =  [];

var gameOver = false;


window.onload = function() {
  startGame();
}

function setMines() {

  let minesLeft = mines;
  while (minesLeft > 0) {
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * colums);
    let id = r.toString() + "-" + c.toString();

    if(!minesLocation.includes(id)) {
      minesLocation.push(id);
      minesLeft -= 1;
    }
  }
}

function startGame() {
  document.getElementById("mines-count").innerText = mines;
  setMines();

  for (let r = 0 ; r < rows; ++r) {
    let row = [];
    for(let c = 0 ; c < colums; ++c) {
      let tile = document.createElement('div');
      tile.id = r.toString() + "-" + c.toString();
      tile.addEventListener('click' , clickTile);
      tile.addEventListener('contextmenu', event => event.preventDefault());
      tile.addEventListener('contextmenu', setFlag);
      document.getElementById('board').append(tile);
      row.push(tile);
    }
    board.push(row);
  }
  console.log(minesLocation);
}

function setFlag() {
  let tile = this;
if (gameOver == false) {
    if (tile.innerText == "🚩") {
      tile.innerText = "";
      ++mines;
    } else if (tile.innerText == "") {
        tile.innerText = "🚩"
        --mines;
    }
  }
}

function clickTile() {
  let tile = this;
  if (minesLocation.includes(tile.id)) {
    showMines();
    if (!alert("GAME OVER")) {
      window.location.reload();
    }
    gameOver = true ;
    return;
  }

  let position = tile.id.split("-");
  let r = parseInt(position[0]);
  let c = parseInt(position[1]);
  checkMine(r, c);
}

function showMines() {
  for (let r = 0 ; r < rows; ++r) {
    for (let c = 0; c < colums; ++c) {
      let tile = board[r][c];
      if (minesLocation.includes(tile.id)) {
        tile.innerText = "💣" ;
        tile.style.backgroundColor = "red";
      }
    }
  }
}

function checkMine(r, c) {
  if (r < 0 || r >= rows || c < 0 || c >= colums) {
    return;
  }
  if (board[r][c].classList.contains("tile-clicked")) {
    return;
  }

  board[r][c].classList.add("tile-clicked");
  clickedTile += 1;

  let minesFound = 0;

  minesFound += checkTile(r - 1, c - 1);
  minesFound += checkTile(r - 1, c);
  minesFound += checkTile(r - 1, c + 1);
  minesFound += checkTile(r, c - 1);
  minesFound += checkTile(r, c + 1);
  minesFound += checkTile(r + 1, c - 1);
  minesFound += checkTile(r + 1, c);
  minesFound += checkTile(r + 1, c + 1);

  if (minesFound > 0 ) {
    board[r][c].innerText = minesFound;
  } else {
    checkMine(r - 1, c - 1);
    checkMine(r - 1, c);
    checkMine(r - 1, c + 1);
    checkMine(r, c - 1);
    checkMine(r, c + 1);
    checkMine(r + 1, c - 1);
    checkMine(r + 1, c);
    checkMine(r + 1, c + 1);
  }
}

function checkTile(r, c) {
  if (r < 0 || r >= rows || c < 0 || c >= colums) {
    return 0;
  }
  if (minesLocation.includes(r.toString() + "-" + c.toString())) {
    return 1;
  }
  return 0;
}

myInterval = setInterval(minesLeft, 100);

function minesLeft() {
  document.getElementById("mines-count").innerText = mines;
  if (clickedTile == 95) {
    showMines();
    if(!alert("Congratulations! You WON!")) {
      window.location.reload();
  }
    clearInterval(myInterval);
  }
  console.log(mines);
}
