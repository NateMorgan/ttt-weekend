function findValidMoves(board){
  let validMoves = []
  board.forEach(function(space, idx) {
    if (!space){
      validMoves.push(idx)
    }
  });
  return validMoves
}

function randomAgent(board,playerId){
  let validMoves = findValidMoves(board)
  let moveIdx = validMoves[Math.floor(Math.random()*validMoves.length)]
  board[moveIdx] = playerId
  return moveIdx
}