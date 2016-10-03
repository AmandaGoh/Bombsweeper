$(document).ready(function (){

console.log('it works!')

var $board = $('#container')

var noOfBombs = 0

//Bind each cell to either function
function bombCell () {
  this.bomb = true
  this.empty = false
  this.clicked = false
}

function emptyCell () {
  this.bomb = false
  this.empty = true
  this.clicked = false
  this.okToReveal = false
}

//Activate Easy or Hard Level
$('#easy').on('click', easyGame)
$('#hard').on('click', hardGame)

$('#reset').on('click', resetGame)

//Default difficulty level
easyGame()

function easyGame () {
  boardSize = 10
  noOfBombs = boardSize * boardSize * 0.20
  // console.log(noOfBombs)
  createBoard()
  startGame()
}

function hardGame() {
  boardSize = 20
  noOfBombs = boardSize * boardSize * 0.25
  // console.log(noOfBombs)
  createBoard()
  startGame()
}

function resetGame() {
  window.location.reload(true)
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
        $rowDiv.addClass('row' + ' ' + i)
        //Give each row a number
        $($rowDiv).attr('row-num', i)
//Create matrix cell columns
        matrix[i] = new Array(boardSize)
        $($board).append($rowDiv)

        for (var j = 0; j < boardSize; j++){
            var $cell = $('<button>')
            $cell.addClass('cell' + ' ' + j)
            //Give each cell a number
            $($cell).attr('cell-num', j)
            $($rowDiv).append($cell)
            //Create each cell as an empty one when creating board
            matrix[i][j] = new (emptyCell)
      }
    }
    generateBombs()
    return matrix
  }

  function generateBombs(){
    $('.cell').html('')
    //Generate a random i and j coordinate to plant bombs
    for (var i = 0; i < noOfBombs ; i++){
        var randomi = Math.round(Math.random() * (matrix.length - 1))
        var randomj = Math.round(Math.random() * (matrix.length - 1))
        //prevent random generation of repeated coordinates
          while (matrix[randomi][randomj].bomb === true){
            var randomi = Math.round(Math.random() * (matrix.length - 1))
            var randomj = Math.round(Math.random() * (matrix.length - 1))
          }
        matrix[randomi][randomj] = new (bombCell)
      //To see which coordinates have bombs
        console.log(randomi + ":" + randomj)
    }
    return matrix
  }

//Start game on click of any cell
function startGame() {
      var $anyCell = $('.cell')
      $($anyCell).on('click', playGame)
  // console.log($(this).attr('cell-num'))
  // console.log($(this).parent().attr('row-num'))
    function playGame() {
        var bombCount = 0
        var rowClicked = parseInt($(this).parent().attr('row-num'))
        var cellClicked = parseInt($(this).attr('cell-num'))
        matrix[rowClicked][cellClicked].clicked = true
        // console.log(typeof rowClicked)
        // matrix[rowClicked][cellClicked] = new Object (emptyCell)
        // console.log(matrix[rowClicked][cellClicked].bomb)
        if (matrix[rowClicked][cellClicked].bomb === true){
          // $(this).css('background', 'red')
          $(this).addClass('bomb')
          gameOver()
        }
        if (matrix[rowClicked][cellClicked].empty === true){
          revealClue()
        }
        if (bombCount ===0){
          floodClues()
        }
    //Defining functions within Play Game
            function gameOver () {
              alert('Game Over!')
              }

    // console.log(matrix.length)

        function revealClue() {
          // console.log(cellClicked)
          //check cell to the left up
            if (rowClicked !== 0 && cellClicked !== 0){
              if (matrix[rowClicked - 1][cellClicked - 1].bomb === true){
                bombCount += 1
              }
            }
          // check cell above
            if (rowClicked !== 0){
              if (matrix[rowClicked - 1][cellClicked].bomb === true){
                bombCount += 1
              }
              else {
                matrix[rowClicked - 1][cellClicked].okToReveal = true
              }
            }
          //check cell to the right up
            if (rowClicked !== 0 && cellClicked !== (matrix.length - 1)){
             if (matrix[rowClicked - 1][cellClicked + 1].bomb === true){
                bombCount += 1
              }
            }
          //check cell to the right
            if(cellClicked !== (matrix.length - 1)) {
              if (matrix[rowClicked][cellClicked + 1].bomb === true){
                bombCount += 1
              }
              else {
                matrix[rowClicked][cellClicked + 1].okToReveal = true
              }
            }
          //check cell down right
            if(rowClicked !== (matrix.length -1) && cellClicked !== (matrix.length -1)){
              if (matrix[rowClicked + 1][cellClicked + 1].bomb === true){
                bombCount += 1
              }
            }
          //check cell down
            if(rowClicked !== (matrix.length - 1)){
              if (matrix[rowClicked + 1][cellClicked].bomb === true){
                bombCount += 1
              }
              else {
                matrix[rowClicked + 1][cellClicked].okToReveal = true
              }
            }
          //check cell down left
            if(rowClicked !== (matrix.length -1) && cellClicked !== 0){
              if (matrix[rowClicked + 1][cellClicked - 1].bomb === true){
                bombCount += 1
              }
            }
          //check cell left
            if(cellClicked !== 0) {
              if (matrix[rowClicked][cellClicked - 1].bomb === true){
                bombCount += 1
              }
              else {
                matrix[rowClicked][cellClicked - 1].okToReveal = true
              }
            }
              return bombCount
            }

            $(this).text(bombCount)

        function floodClues(){
          //Cell up
          if (rowClicked > 0) {
            if(matrix[rowClicked - 1][cellClicked].okToReveal === true && matrix[rowClicked - 1][cellClicked].clicked === false){
              var $triggerCellUp = $('.row.' + (rowClicked - 1)).find('.cell.' + cellClicked)
              $($triggerCellUp).trigger('click')
              matrix[rowClicked - 1][cellClicked].clicked = true
              }
            }
          //Cell Right
          if (cellClicked < (matrix.length-1)) {
            if(matrix[rowClicked][cellClicked + 1].okToReveal === true && matrix[rowClicked][cellClicked + 1].clicked === false){
              var $triggerCellRight = $('.row.' + rowClicked).find('.cell.' + (cellClicked + 1))
              $($triggerCellRight).trigger('click')
              matrix[rowClicked][cellClicked + 1].clicked = true
              }
            }
          //Cell down
          if(rowClicked < (matrix.length -1)){
            if(matrix[rowClicked + 1][cellClicked].okToReveal === true && matrix[rowClicked + 1][cellClicked].clicked === false){
              var $triggerCellDown = $('.row.' + (rowClicked + 1)).find('.cell.' + cellClicked)
              $($triggerCellDown).trigger('click')
              matrix[rowClicked + 1][cellClicked].clicked = true
              }
            }
          //Cell Left
          if(cellClicked > 0){
            if(matrix[rowClicked][cellClicked - 1].okToReveal === true && matrix[rowClicked][cellClicked - 1].clicked === false){
              var $triggerCellLeft = $('.row.' + rowClicked).find('.cell.' + (cellClicked - 1))
              $($triggerCellLeft).trigger('click')
              matrix[rowClicked][cellClicked - 1].clicked = true
              }
            }
        }

      }



    }

})
