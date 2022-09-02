/*-------------------------------- Constants --------------------------------*/
const playerOne = "X"
const playerTwo = "O"
const winArrays = [ [0,1,2],
                    [3,4,5],
                    [6,7,8],
                    [0,3,6],
                    [1,4,7],
                    [2,5,8],
                    [0,4,8],
                    [2,4,6]
                  ]


/*---------------------------- Variables (state) ----------------------------*/
let board = [null,null,null,null,null,null,null,null,null]
let player = 1
// -1 and 1 for player wins, 0 for draw
let winner = null

/*------------------------ Cached Element References ------------------------*/
const boardEle = document.getElementById('game-space')
const messageEle = document.getElementById('message')
const resetBtn = document.getElementById('reset-btn')
const allDivs = document.querySelectorAll('.square')

/*----------------------------- Event Listeners -----------------------------*/
boardEle.addEventListener('click',pickSquare)
resetBtn.addEventListener('click',init)

/*-------------------------------- Functions --------------------------------*/
function init(){
  resetBtn.hidden = true
  board = [null,null,null,null,null,null,null,null,null]
  player = 1
  winner = null
  allDivs.forEach( (ele) => ele.innerText = '')
  renderMessage()
}


function pickSquare(evt){
  targetSquare = evt.target
  targetSquareIdx = parseInt(targetSquare.id.at(-1))
  if (board[targetSquareIdx] === null && winner === null){
    board[targetSquareIdx] = player
    player *= -1
    render(targetSquareIdx)
  }


  
}

function render(idx){
  resetBtn.hidden = false
  renderTokens(idx)
  checkResult()
  renderMessage()
}

function renderMessage(){
  if (winner === null){
    messageEle.innerText = `Player ${(player > 0) ? 1:2} pick your square`
  } else if (winner !== 0){
    messageEle.textContent = `GAMEOVER: PLAYER ${winner} WON`
  } else {
    messageEle.textContent = `GAMEOVER: DRAW`
  }
}

function renderTokens(idx){
  renderSquare = document.getElementById(`sq${idx}`)
  renderSquare.innerText = (-1* player > 0) ? playerOne : playerTwo
}

function checkResult(){
  for (win of winArrays){
    let check = win.map( (val) => board[val])
    if (check.every( ele => ele === (-1*player))){
      winner = -1*player
    }
    if (winner === null && !board.some( ele => ele === null)){
      winner = 0 
    }
  }
}
