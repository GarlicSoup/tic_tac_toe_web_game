var origBoard;
const human = '0';
const aiPlayer = 'X';
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2]
]

const cells = document.querySelectorAll('.cell');
startGame();

function startGame() {
  document.querySelector(".endgame").style.display = "none";
  origBoard = Array.from(Array(9).keys()); // assign id to each of the cells
  for (var i=0; i<cells.length; i++) {
    cells[i].innerText = '';
    cells[i].style.removeProperty('background-color');
    // add the player's symbol when clicking on a cell
    cells[i].addEventListener('click', turnClick, false); 
  }
}

function turnClick(square) {
  if (typeof origBoard[square.target.id] == 'number') {
    // If neither human or ai has chosen the cell previously, then proceed.
    let gameWon = null;
    // human click on a cell
    gameWon = turn(square.target.id, human);

    // if the game is not tie, AI turn to play
    if (!gameWon && !checkTie()) {turn(bestSpot(), aiPlayer);} 
  }
}

function turn(squareId, player) {
  origBoard[squareId] = player;
  // add text to where the player clicks
  document.getElementById(squareId).innerText = player; 

  // check if the game has been won
  let gameWon = checkWin(origBoard, player);
  if (gameWon) {gameOver(gameWon)}

  return gameWon;
}

function checkWin(board, player) {
  // a: accumulator, e: element in the board, i: index
  // reduce((previousValue, currentValue, currentIndex, array) => { ... }, initialValue)
  let plays = board.reduce((a,e,i) => 
    (e===player) ? a.concat(i) : a, [] );
  // console.log(plays);
  let gameWon = null;
  for (let [index, win] of winCombos.entries()) {
    if (win.every(elem => plays.indexOf(elem) >-1)) {
      gameWon = {index: index, player: player};
      break;
    }
  }
  return gameWon;
}

function gameOver(gameWon){
  // check game over by using gameWon dictationary
  for (let index of winCombos[gameWon.index]) {
    document.getElementById(index).style.backgroundColor = 
      gameWon.player == human ? "blue" : "red";
  }
  for (var i=0; i<cells.length; i++) {
    cells[i].removeEventListener('click', turnClick, false);
  }
  declareWinner(gameWon.player == human ? "You win!" : "You lose!");
}

function declareWinner(who) {
	document.querySelector(".endgame").style.display = "block";
	document.querySelector(".endgame .text").innerText = who;
}

function emptySquares() {
  return origBoard.filter(s => typeof s == 'number');
}

function bestSpot() {
  return minimax_alpha_beta(origBoard, aiPlayer, 0, -10000, 10000).index;
}

function checkTie() {
  if (emptySquares().length == 0) {
    for (var i=0; i<cells.length; i++) {
      cells[i].style.backgroundColor = 'green';
      cells[i].removeEventListener('click', turnClick, false);
    }
    declareWinner("Tie Game!");
    return true;
  }
}

// function minimax(newBoard, player, h, alpha, beta) {
//   var availSpots = emptySquares(newBoard);

//   if (checkWin(newBoard, human)) {
//     return {score: h-10};
//   } else if (checkWin(newBoard, aiPlayer)) {
//     return {score: -h+10};
//   } else if (availSpots.length === 0 ) {
//     return {score: 0};
//   }
//   var moves = [];
//   for (var i=0; i<availSpots.length; i++) {
//     var move = {};
//     move.index = newBoard[availSpots[i]];
//     newBoard[availSpots[i]] = player;

//     if (player == aiPlayer) {
//       var result= minimax(newBoard, human, h+0.1, alpha, beta);
//       move.score = result.score;
//     } else {
//       var result= minimax(newBoard, aiPlayer, h+0.1, alpha, beta);
//       move.score = result.score;
//     }

//     newBoard[availSpots[i]] = move.index;

//     moves.push(move);
//   }

//   var bestMove;
//   if (player === aiPlayer) {
//     var bestScore = -10000;
//     for (var i=0; i<moves.length; i++) {
//       if (moves[i].score > bestScore) {
//         bestScore = moves[i].score;
//         bestMove = i;
//       }
//       alpha = Math.max(alpha, bestScore);
//       if (alpha > beta) {
//         break;
//       }
//     }
//   } else {
//     var bestScore = 10000;
//     for (var i=0; i<moves.length; i++) {
//       if (moves[i].score < bestScore) {
//         bestScore = moves[i].score;
//         bestMove = i;
//       } 
//       beta = Math.min(beta, bestScore);
//       if (alpha > beta) {
//         break;
//       }
//     }
//   }
//   console.log("alpha: " + alpha);
//   console.log("beta:" + beta);
//   return moves[bestMove];
// }


function minimax_alpha_beta(newBoard, player, h, alpha, beta) {
  var availSpots = emptySquares(newBoard);

  if (checkWin(newBoard, human)) {
    return {score: h-10};
  } else if (checkWin(newBoard, aiPlayer)) {
    return {score: -h+10};
  } else if (availSpots.length === 0 ) {
    return {score: 0};
  }
  var bestMove;

  if (player === aiPlayer) {
    // player is AI
    var bestScore = -10000;
    for (var i=0; i<availSpots.length; i++) {
      var move = {};
      move.index = newBoard[availSpots[i]];
      newBoard[availSpots[i]] = player;
  
      var result = minimax_alpha_beta(newBoard, human, h+0.1, alpha, beta);
      move.score = result.score;
  
      newBoard[availSpots[i]] = move.index;

      if (move.score > bestScore) {
        bestScore = move.score;
        bestMove = move.index;
      }
      alpha = Math.max(alpha, bestScore);
      if (alpha > beta) break;
    }
    move.score = bestScore;
  } else {
    // player is human
    var bestScore = 10000;
    for (var i=0; i<availSpots.length; i++) {
      var move = {};
      move.index = newBoard[availSpots[i]];
      newBoard[availSpots[i]] = player;
  
      var result = minimax_alpha_beta(newBoard, aiPlayer, h+0.1, alpha, beta);
      move.score = result.score;

      newBoard[availSpots[i]] = move.index;

      if (move.score < bestScore) {
        bestScore = move.score;
        bestMove = i;
      } 
      beta = Math.min(beta, bestScore);
      if (alpha > beta) break;
    }
    move.score = bestScore;
  }
  move.index = bestMove;
  return move;
}