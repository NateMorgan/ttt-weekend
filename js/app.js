/*-------------------------------- Constants --------------------------------*/
const benWinAudio = new Audio("./audio/ben-win.mp3")
const horseWinAudio = new Audio("./audio/bad-horse-win.mp3")
const benPlaysAudio = new Audio("./audio/ben-plays.mp3")
const horsePlaysAudio = new Audio("./audio/horse-play.mp3")
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
  horseWinAudio.volume = .2
  benWinAudio.volume = .2
  horsePlayAudio.volume = .2
  benPlayAudio.volume = .2
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
    if (!agent && styleToggle.textContent === "Classic" &&!winner){
      player < 0 ? benPlaysAudio.play() : horsePlaysAudio.play()
    }
  }
}

function render(){
  if (!(board.every( spot => spot === null))){
    resetBtn.hidden = false
  }
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
    if (styleToggle.textContent === "Classic"){
      winner > 0 ? benWinAudio.play() : horseWinAudio.play()
    }
  } else {
    messageEl.textContent = `GAMEOVER: DRAW`
  }
}

function renderTokens(){
  board.forEach(function (token,idx){
    if (token){
      squareEls[idx].innerHTML = (token > 0) ? playerOne : playerTwo
    } else {
      squareEls[idx].innerHTML = ""
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
    styleToggle.innerText = "Classic"
    myCSS.setAttribute('href', 'css/style-ga.css')
    resetBtn.className = "btn btn-dark"
    playerOne = '<img src="img/ben.png">'
    playerTwo = '<img src="img/badhorse.png">'
    // console.log("I'm now GA")
  } else {
    styleToggle.innerHTML = `<img id="ga-logo" src="img/ga-logo.png">`
    myCSS.setAttribute('href', 'css/style-classic.css')
    resetBtn.className = "btn btn-light"
    playerOne = "X"
    playerTwo = "O"
    // console.log("I'm now Classic")
  }
  render()
}