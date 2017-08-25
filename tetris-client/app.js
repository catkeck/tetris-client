$(document).ready(function() {
  $('.play-button').hide()
  let user_name;
  
  $('#welcome-form').on("submit", function(e) {
    user_name = $('input').val()
    $('#welcome').hide()
    $('.play-button').show()
    e.preventDefault()

  })
  
  $('.play-button').on("click", playGame)


  function playGame() {
    let game = new Game(user_name);
    let dataFetcher = new TetrisAdapter;
    $('.play-button').hide()
    dataFetcher.getGames()

    game.board.render();
    $('#score').html(`<h1>Score: ${game.score}</h1>`)

    document.addEventListener("keydown", function (e) {
      if (e.which == 39) {
        game.moveRight(game.currentBlock, game.board.grid);
        game.board.render();
      } else if (e.which == 37) {
        game.moveLeft(game.currentBlock, game.board.grid);
        game.board.render();      
      } else if (e.which == 40) {
        game.moveDown(game.currentBlock, game.board.grid);
        game.board.render();
      // } else if (e.which == 32) {
      //   game.fastFall(game.currentBlock, game.board.grid);
      //   game.board.render();      
      } else if (e.which == 38) {
        game.removeBlock();
        game.currentBlock.rotate();
        game.insertBlock();
        // debugger
        game.board.render();
      }

      e.preventDefault();
    })
  }

})



