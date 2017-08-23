$(document).ready(function() {

  $('#play-button').on("click", function() {
    let game = new Game("Caitlin");
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
    } else if (e.which == 32) {
      game.fastFall(game.currentBlock, game.board.grid);
      game.board.render();      
    } else if (e.which == 38) {
      game.currentBlock.rotate();
      game.insertBlock();
      game.board.render();
    }

    e.preventDefault();
  })
})

  

})



