$(document).ready(function () {
  // console.log('it works!')

  var $board = $('#container')

  var noOfBombs = 0
  var revealedCells = 0

  // Bind each cell to either function
  function bombCell () {
    this.bomb = true
    this.empty = false
    this.clicked = false
    this.flagged = false
    this.revealed = false
  }

  function emptyCell () {
    this.bomb = false
    this.empty = true
    this.clicked = false
    this.okToReveal = false
    this.flagged = false
    this.revealed = false
  }

  // Activate Easy or Hard Level
  $('#easy').on('click', easyGame)
  $('#hard').on('click', hardGame)

  $('#reset').on('click', resetGame)

  // Default difficulty level
  easyGame()

  function easyGame () {
    revealedCells = 0
    boardSize = 10
    noOfBombs = boardSize * boardSize * 0.10
    // console.log(noOfBombs)
    createBoard()
    startGame()
  }

  function hardGame () {
    revealedCells = 0
    boardSize = 20
    noOfBombs = boardSize * boardSize * 0.20
    // console.log(noOfBombs)
    createBoard()
    startGame()
  }

  function resetGame () {
    window.location.reload(true)
  }

  // Board has i rows and j columns
  function createBoard () {
    $('#container').html('')
    $('.alert.one').text('Click a Cell to Begin!')
    $('.alert.one').addClass('before')
    if($('.alert.one').hasClass('finish')){
      $('.alert.one').removeClass('finish')
    }

    var boardWidthHeight = 30 * boardSize
    $board.width(boardWidthHeight).height(boardWidthHeight)

    // Create matrix row
    matrix = new Array(boardSize)
    for (var i = 0; i < boardSize; i++) {
      var $rowDiv = $('<div>')
      $rowDiv.addClass('row' + ' ' + i)
      // Give each row a number
      $($rowDiv).attr('row-num', i)
      // Create matrix cell columns
      matrix[i] = new Array(boardSize)
      $($board).append($rowDiv)

      for (var j = 0; j < boardSize; j++) {
        var $cell = $('<button>')
        $cell.addClass('cell' + ' ' + j)
        // Give each cell a number
        $($cell).attr('cell-num', j)
        $($rowDiv).append($cell)
        // Create each cell as an empty one when creating board
        matrix[i][j] = new (emptyCell)
      }
    }
    generateBombs()
    // reveal bombs in red on grid (to check win condition)
    // for (var i = 0; i < boardSize; i++) {
    //   for (var j = 0; j < boardSize; j++) {
    //     if (matrix[i][j].bomb === true) {
    //       $('.row.' + i).find('.cell.' + j).css('background', 'red')
    //     }
    //   }
    // }
    return matrix
  }

  function generateBombs () {
    $('.cell').html('')
    // Generate a random i and j coordinate to plant bombs
    for (var i = 0; i < noOfBombs; i++) {
      var randomi = Math.round(Math.random() * (matrix.length - 1))
      var randomj = Math.round(Math.random() * (matrix.length - 1))
      // prevent random generation of repeated coordinates
      while (matrix[randomi][randomj].bomb === true){
        var randomi = Math.round(Math.random() * (matrix.length - 1))
        var randomj = Math.round(Math.random() * (matrix.length - 1))
      }
      matrix[randomi][randomj] = new (bombCell)
      // To see which coordinates have bombs
      // console.log(randomi + ':' + randomj)
    }
    return matrix
  }

  // Start game on click of any cell
  function startGame () {
    var noOfFlags = noOfBombs
    var $anyCell = $('.cell')
    $($anyCell).on('click', playGame)
    $($anyCell).on('contextmenu', flagCell)
    // remove browser menu upon right click
    $($anyCell).contextmenu(function () {
      return false
    })
    // console.log($(this).attr('cell-num'))
    // console.log($(this).parent().attr('row-num'))
    function playGame () {
      var rowClicked = parseInt($(this).parent().attr('row-num'))
      var cellClicked = parseInt($(this).attr('cell-num'))

      //only allow a click if cell has not been clicked before
      if (matrix[rowClicked][cellClicked].clicked === false) {
          var bombCount = 0
          matrix[rowClicked][cellClicked].clicked = true
          $(this).addClass('revealed-cell')
          $('.row.' + rowClicked).find('.cell.' + cellClicked).addClass('revealed')
          revealedCells += 1
      // upon first click
          if (revealedCells === 1) {
              $('.alert.one').removeClass('before')
              $('.alert.one').text("No of Bombs : " + noOfBombs)
              $('.alert.two').text("No of Flags : " + noOfFlags)
          }
          if (matrix[rowClicked][cellClicked].bomb === true) {
            // $(this).css('background', 'red')
              $(this).addClass('bomb')
              gameOver()
          }
          if (matrix[rowClicked][cellClicked].empty === true) {
            revealClue()
          }
          if (bombCount === 0) {
            floodClues()
          }
          if (matrix[rowClicked][cellClicked].bomb === false) {
          checkWin()
          }
      }
      // Player Wins if ALL cells revealed and there are no bombs revealed
      // Defining functions within Play Game
      function gameOver () {
        $('#bomb-sound')[0].play()
        $('.alert.two').text('')
        $('.alert.one').text('Game Over')
        $('.alert.one').addClass('finish')
        $($anyCell).off('click', playGame)
        $($anyCell).off('contextmenu', flagCell)
      }
      // console.log(revealedCells)
      function checkWin () {
        if (revealedCells == boardSize * boardSize - noOfBombs) {
          $('#crowd-cheer')[0].play()
          $('.alert.two').text('')
          $('.alert.one').text('Unbelieveable! You are a champ!')
          $('.alert.one').addClass('finish')
          $($anyCell).off('click', playGame)
          $($anyCell).off('contextmenu', flagCell)
          // window.setTimeout(function restart () {
          //   window.location.reload(true)
          // }, 5000)
        }
      }

      function revealClue () {
        // console.log(cellClicked)
        // check cell to the left up
        if (rowClicked !== 0 && cellClicked !== 0) {
          if (matrix[rowClicked - 1][cellClicked - 1].bomb === true) {
            bombCount += 1
          }
        }
        // check cell above
        if (rowClicked !== 0) {
          if (matrix[rowClicked - 1][cellClicked].bomb === true) {
            bombCount += 1
          } else {
            matrix[rowClicked - 1][cellClicked].okToReveal = true
          }
        }
        // check cell to the right up
        if (rowClicked !== 0 && cellClicked !== (matrix.length - 1)) {
          if (matrix[rowClicked - 1][cellClicked + 1].bomb === true) {
            bombCount += 1
          }
        }
        // check cell to the right
        if (cellClicked !== (matrix.length - 1)) {
          if (matrix[rowClicked][cellClicked + 1].bomb === true) {
            bombCount += 1
          }else {
            matrix[rowClicked][cellClicked + 1].okToReveal = true
          }
        }
        // check cell down right
        if (rowClicked !== (matrix.length - 1) && cellClicked !== (matrix.length - 1)) {
          if (matrix[rowClicked + 1][cellClicked + 1].bomb === true) {
            bombCount += 1
          }
        }
        // check cell down
        if (rowClicked !== (matrix.length - 1)) {
          if (matrix[rowClicked + 1][cellClicked].bomb === true) {
            bombCount += 1
          }else {
            matrix[rowClicked + 1][cellClicked].okToReveal = true
          }
        }
        // check cell down left
        if (rowClicked !== (matrix.length - 1) && cellClicked !== 0) {
          if (matrix[rowClicked + 1][cellClicked - 1].bomb === true) {
            bombCount += 1
          }
        }
        // check cell left
        if (cellClicked !== 0) {
          if (matrix[rowClicked][cellClicked - 1].bomb === true) {
            bombCount += 1
          }else {
            matrix[rowClicked][cellClicked - 1].okToReveal = true
          }
        }
        return bombCount
      }

      $(this).text(bombCount)

      function floodClues () {
        // Cell up
        if (rowClicked > 0) {
          if (matrix[rowClicked - 1][cellClicked].okToReveal === true && matrix[rowClicked - 1][cellClicked].clicked === false) {
            var $triggerCellUp = $('.row.' + (rowClicked - 1)).find('.cell.' + cellClicked)
            $($triggerCellUp).trigger('click')
            matrix[rowClicked - 1][cellClicked].clicked = true
            matrix[rowClicked - 1][cellClicked].revealed = true
            $('.row.' + (rowClicked - 1)).find('.cell.' + cellClicked).addClass('revealed')
          }
        }
        // Cell Right
        if (cellClicked < (matrix.length - 1)) {
          if (matrix[rowClicked][cellClicked + 1].okToReveal === true && matrix[rowClicked][cellClicked + 1].clicked === false) {
            var $triggerCellRight = $('.row.' + rowClicked).find('.cell.' + (cellClicked + 1))
            $($triggerCellRight).trigger('click')
            matrix[rowClicked][cellClicked + 1].clicked = true
            matrix[rowClicked][cellClicked + 1].revealed = true
            $('.row.' + rowClicked).find('.cell.' + (cellClicked + 1)).addClass('revealed')
          }
        }
        // Cell down
        if (rowClicked < (matrix.length - 1)) {
          if (matrix[rowClicked + 1][cellClicked].okToReveal === true && matrix[rowClicked + 1][cellClicked].clicked === false) {
            var $triggerCellDown = $('.row.' + (rowClicked + 1)).find('.cell.' + cellClicked)
            $($triggerCellDown).trigger('click')
            matrix[rowClicked + 1][cellClicked].clicked = true
            matrix[rowClicked + 1][cellClicked].revealed = true
            $('.row.' + (rowClicked + 1)).find('.cell.' + cellClicked).addClass('revealed')
          }
        }
        // Cell Left
        if (cellClicked > 0) {
          if (matrix[rowClicked][cellClicked - 1].okToReveal === true && matrix[rowClicked][cellClicked - 1].clicked === false) {
            var $triggerCellLeft = $('.row.' + rowClicked).find('.cell.' + (cellClicked - 1))
            $($triggerCellLeft).trigger('click')
            matrix[rowClicked][cellClicked - 1].clicked = true
            matrix[rowClicked][cellClicked - 1].revealed = true
            $('.row.' + rowClicked).find('.cell.' + (cellClicked - 1)).addClass('revealed')
          }
        }
        return matrix
      }
    }

    function flagCell () {
      var rowClicked = parseInt($(this).parent().attr('row-num'))
      var cellClicked = parseInt($(this).attr('cell-num'))
      console.log(noOfFlags)
      // console.log(rowClicked + ":" + cellClicked)
      if (matrix[rowClicked][cellClicked].clicked === false && noOfFlags > 0) {
        $('.row.' + rowClicked).find('.cell.' + cellClicked).addClass('flag')
        matrix[rowClicked][cellClicked].clicked = true
        matrix[rowClicked][cellClicked].flagged = true
        noOfFlags -= 1
        $('.alert.two').text("No of Flags : " + noOfFlags)
      }
      // if cell has been right-clicked before, right-clicking again will remove flag
      else if (matrix[rowClicked][cellClicked].flagged === true) {
        $('.row.' + rowClicked).find('.cell.' + cellClicked).removeClass('flag')
        matrix[rowClicked][cellClicked].clicked = false
        matrix[rowClicked][cellClicked].flagged = false
        noOfFlags += 1
        $('.alert.two').text("No of Flags : " + noOfFlags)
      }


    }
  }

})
