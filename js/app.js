/*-------------------------------- Constants --------------------------------*/
const playerOne = "X"
const playerTwo = "O"


/*---------------------------- Variables (state) ----------------------------*/
let board = [null,null,null,null,null,null,null,null,null]
let player = 1
let gameover = false

/*------------------------ Cached Element References ------------------------*/
const boardEle = document.getElementById('game-space')



/*----------------------------- Event Listeners -----------------------------*/
boardEle.addEventListener('click',pickSquare)


/*-------------------------------- Functions --------------------------------*/
function pickSquare(evt){
  targetSquare = evt.target

  targetSquareIter = parseInt(targetSquare.id.at(-1))


}
