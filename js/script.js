$(document).ready(function (){

console.log('it works!')

var $board = $('#container')


var noOfBombs = 0
//Game Difficulty Levels
// var easyGame = {
//   boardSize: 20,
//   noOfBombs: 50
// }
// var hardGame = {
//   boardSize: 30,
//   noOfBombs: 100
// }
//Activate Easy Level
$('#easy').on('click', easyGame)
$('#hard').on('click', hardGame)

function easyGame () {
  createBoard(20)
}

function hardGame() {
  createBoard(40)
}

var matrix = []
var cellCoordinates = []

//Board has i rows and j columns
function createBoard(boardSize){
  $('#container').html('')

  var boardWidthHeight = 30 * boardSize
  $board.width(boardWidthHeight).height(boardWidthHeight)

  matrix = new Array(boardSize)
  for (var i = 0; i < boardSize; i++){
    var $rowDiv = $('<div>')
    // $($rowDiv).text('test')
    matrix[i] = new Array(boardSize)
    $($board).append($rowDiv)

    for (var j = 0; j < boardSize; j++){

      var $cell = $('<button>')
      $cell.addClass('cell')
      // $($cell).text('test')
      $($rowDiv).append($cell)

      //Give each cell a coordinate
      matrix[i][j] = $cell
      $cell.i = i
      $cell.j = j

      cellCoordinates.push($cell)
      }
    //randomly generate bombs
    generateBombs(cellCoordinates)
    }
  }

function generateBombs (){



}
})
