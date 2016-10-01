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
}

function hardGame() {
  boardSize = 30
  noOfBombs = 200
  createBoard()
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
      }
    }
    generateBombs()
    console.log(matrix)
  }

//Start game on click of any cell
var $anyCell = $('.cell')
$($anyCell).on('click', startGame)

function startGame(){
  // console.log($(this).attr('cell-num'))
  // console.log($(this).parent().attr('row-num'))
  // var rowClicked = parseInt($(this).parent().attr('row-num'))
  // var cellClicked = parseInt($(this).attr('cell-num'))
  // // console.log(typeof rowClicked)
  // matrix[rowClicked][cellClicked] = new Object (emptyCell)
  // console.log(matrix[rowClicked][cellClicked].bomb)

  // console.log(matrix)
}

function generateBombs(){
//Generate a random i and j coordinate to plant bombs
  for (var i = 0; i < noOfBombs ; i++){
    var randomi = Math.floor((Math.random() * (matrix.length - 1)))
    var randomj = Math.floor((Math.random() * (matrix.length - 1)))
      matrix[randomi][randomj] = new Object (bombCell)
      console.log(randomi + ":" + randomj)
    }
    return matrix
  }


// function renderBombs () {
//   for (var i = 0; i < matrix.length; i++) {
// 		for (var j = 0; j < matrix.length; j++) {
// 				if (cellCoordinates[i][j]["bomb"] === true) {
// 			console.log("i is " + (i) + " j is " + (j))
//         }
//       }
//     }
//   }


})
