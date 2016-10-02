$(document).ready(function (){

console.log('it works!')

var $board = $('#container')

var noOfBombs = 0


var bombCell = {
  bomb: true,
  empty: false,
  clue: false
}

var emptyCell = {
  bomb: false,
  empty: true,
  clue: false
}

//Activate Easy or Hard Level
$('#easy').on('click', easyGame)
$('#hard').on('click', hardGame)

//Default difficulty level
easyGame()

function easyGame () {
  boardSize = 10
  noOfBombs = 20
  createBoard()
  generateBombs()
  startGame()
}

function hardGame() {
  boardSize = 30
  noOfBombs = 200
  createBoard()
  generateBombs()
  startGame()
}

//Board has i rows and j columns
function createBoard(){
  $('#container').html('')

  var boardWidthHeight = 30 * boardSize
  $board.width(boardWidthHeight).height(boardWidthHeight)

//Create matrix row
  matrix = new Array(boardSize)
  for (var i = 0; i < boardSize; i++){
    var $rowDiv = $('<div>')
    //Give each row a number
    $($rowDiv).attr('row-num', i)
//Create matrix cell columns
    matrix[i] = new Array(boardSize)
    $($board).append($rowDiv)

    for (var j = 0; j < boardSize; j++){
      var $cell = $('<button>')
      $cell.addClass('cell')
      //Give each cell a number
      $($cell).attr('cell-num', j)
      $($rowDiv).append($cell)
      //Create each cell as an empty one when creating board
      matrix[i][j] = new Object (emptyCell)
      }
    }
  }

  function generateBombs(){
    $('.cell').html('')
    //Generate a random i and j coordinate to plant bombs
    for (var i = 0; i < noOfBombs ; i++){
      var randomi = Math.floor((Math.random() * (matrix.length - 1)))
      var randomj = Math.floor((Math.random() * (matrix.length - 1)))
      matrix[randomi][randomj] = new Object (bombCell)
    //To see which coordinates have bombs
      console.log(randomi + ":" + randomj)
    }
    return matrix
  }

//Start game on click of any cell
function startGame(){
  var $anyCell = $('.cell')
  $($anyCell).on('click', playGame)
  // console.log($(this).attr('cell-num'))
  // console.log($(this).parent().attr('row-num'))
  function playGame(){
    var bombCount = 0
    var rowClicked = parseInt($(this).parent().attr('row-num'))
    var cellClicked = parseInt($(this).attr('cell-num'))
    // console.log(typeof rowClicked)
    // matrix[rowClicked][cellClicked] = new Object (emptyCell)
    // console.log(matrix[rowClicked][cellClicked].bomb)
    if (matrix[rowClicked][cellClicked].bomb === true){
      // $(this).css('background', 'red')
      $(this).addClass('bomb')
      gameOver()
    }
    else if (matrix[rowClicked][cellClicked].empty === true){
      revealCells()
    }
    function gameOver () {
      alert('Game Over!')
    }

    // console.log(matrix.length)

    function revealCells() {
      //check box to the left up
      if (rowClicked !== 0 && cellClicked !== 0 && matrix[rowClicked - 1][cellClicked - 1].bomb === true){
        bombCount += 1
      }
      // check box above
      if (rowClicked !== 0 && matrix[rowClicked - 1][cellClicked].bomb === true){
        bombCount += 1
      }
      //check box to the right up
      if (rowClicked !== 0 && cellClicked !== (matrix.length - 1) && matrix[rowClicked - 1][cellClicked + 1].bomb === true){
        bombCount += 1
      }
      //check box to the right
      if(cellClicked !== (matrix.length - 1) && matrix[rowClicked][cellClicked + 1].bomb === true){
        bombCount += 1
      }
      //check box down right
      if(rowClicked !== (matrix.length -1) && cellClicked !== (matrix.length -1) && matrix[rowClicked + 1][cellClicked + 1].bomb === true){
        bombCount += 1
      }
      //check box down
      if(rowClicked !== (matrix.length - 1) && matrix[rowClicked + 1][cellClicked].bomb === true){
        bombCount += 1
      }
      //check box down left
      if(rowClicked !== (matrix.length -1) && cellClicked !== 0 && matrix[rowClicked + 1][cellClicked - 1].bomb === true){
        bombCount += 1
      }
      //check box left
      if(cellClicked !== 0 && matrix[rowClicked][cellClicked - 1].bomb === true){
        bombCount += 1
      }
      return bombCount
    }

      $(this).text(bombCount)
    }

}







})
