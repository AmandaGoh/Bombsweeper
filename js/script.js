$(document).ready(function (){

console.log('it works!')

var $board = $('#container')
var boardSize = 20
var noOfBombs = 50

var matrix = []
var cellCoordinates = []

//Board has i rows and j columns
function createBoard(){
  matrix = new Array(boardSize)
  for (var i = 0; i < boardSize; i++){
    var $rowDiv = $('<div>')
    // $($rowDiv).text('test')
    matrix[i] = new Array(boardSize)
    $($board).append($rowDiv)

    for (var j = 0; j < boardSize; j++){

      var $cell = $('<button>')
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
createBoard()

function generateBombs (){


}
})
