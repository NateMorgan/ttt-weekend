/*-------------------------------- Constants --------------------------------*/
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
let board = undefined
let player = undefined
// -1 and 1 for player wins, 0 for draw
let winner = undefined
let agent = null

let playerOne = "X"
let playerTwo = "O"
/*------------------------ Cached Element References ------------------------*/
const boardEle = document.getElementById('game-space')
const messageEl = document.getElementById('message')
const resetBtn = document.getElementById('reset-btn')
const squareEls = document.querySelectorAll('.square')
const oppSelector = document.getElementById('opponent-selector')
const myCSS = document.getElementById('my-css')
const styleToggle = document.getElementById('style-toggle')


/*----------------------------- Event Listeners -----------------------------*/
resetBtn.addEventListener('click',init)
boardEle.addEventListener('click',pickSquare)
oppSelector.addEventListener('click',enterGame)
styleToggle.addEventListener('click',styleChange)

/*-------------------------------- Functions --------------------------------*/


init()

function init(){
  resetBtn.hidden = true
  boardEle.hidden = true
  oppSelector.hidden = false
  board = [null,null,null,null,null,null,null,null,null]
  player = 1
  winner = null
  agent = null
  renderTokens()
  renderMessage()
}

function enterGame(evt){
  if (evt.target.id !== `opponent-selector`){
    if (evt.target.id === `human`){
      agent = false
    } else {
      agent = true
    }
    
    oppSelector.hidden = true
    boardEle.hidden = false

    renderMessage()
  }
}

function pickSquare(evt){
  targetSquare = evt.target
  targetSquareIdx = parseInt(targetSquare.id.at(-1))
  if (board[targetSquareIdx] === null && winner === null){
    board[targetSquareIdx] = player
    player *= -1
    render(targetSquareIdx)
    if (agent && winner == null){
      player *= -1
      render(randomAgent(board,-1*player))
    }
  }
}

function render(){
  resetBtn.hidden = false
  renderTokens()
  checkResult()
  renderMessage()
}

function renderMessage(){
  if (agent === null){
    messageEl.innerText = `Choose your Opponent`
  } else if (winner === null){
    messageEl.innerText = `Player ${(player > 0) ? 1:2} pick your square`
  } else if (winner !== 0){
    messageEl.textContent = `GAMEOVER: PLAYER ${(winner> 0) ? 1:2} WON`
  } else {
    messageEl.textContent = `GAMEOVER: DRAW`
  }
}

function renderTokens(){
  board.forEach(function (token,idx){
    if (token){
      squareEls[idx].innerText = (token > 0) ? playerOne : playerTwo
    } else {
      squareEls[idx].innerText = ""
    }
  })
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

function styleChange(){
  if (styleToggle.textContent !== "Classic"){
    styleToggle.textContent = "Classic"
    myCSS.setAttribute('href', 'css/style-ga.css')
    resetBtn.className = "btn btn-dark"
    const playerOne = "X"
const playerTwo = "O"
    // console.log("I'm now GA")
  } else {
    styleToggle.textContent = "GA"
    myCSS.setAttribute('href', 'css/style-classic.css')
    resetBtn.className = "btn btn-light"
    // console.log("I'm now Classic")
  }
  render()
}