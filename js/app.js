/*-------------------------------- Constants --------------------------------*/
const playerOne = "X"
const playerTwo = "O"


/*---------------------------- Variables (state) ----------------------------*/
let board = [null,null,null,null,null,null,null,null,null]
let player = 1
let gameover = false

/*------------------------ Cached Element References ------------------------*/
const boardEle = document.getElementById('game-space')
const messageEle = document.getElementById('message')

console.log(messageEle)
/*----------------------------- Event Listeners -----------------------------*/
boardEle.addEventListener('click',pickSquare)


/*-------------------------------- Functions --------------------------------*/
function pickSquare(evt){
  targetSquare = evt.target
  targetSquareIdx = parseInt(targetSquare.id.at(-1))
  if (board[targetSquareIdx] === null){
    board[targetSquareIdx] = player
    player *= -1
    render(targetSquareIdx)
  }
  console.log(board)
  console.log(player)

  
}

function render(idx){
  renderMessage()
  renderTokens(idx)
}

function renderMessage(){
  if (gameover){
    messageEle.textContent = `GAMEOVER: PLAYER ${(-1 * player) > 0 ? 1:2} WON`
  } else {
    messageEle.innerText = `Player ${player > 0 ? 1:2} pick your square`
  }
}

function renderTokens(idx){
  renderSquare = document.getElementById(`sq${idx}`)
  renderSquare.innerText = -1* player > 0 ? playerOne : playerTwo
}

function checkResult(){
  console.log("Where to start tomorrow")
}
