$(document).ready(function() {
  let game = new Game("Caitlin");
  game.board.render();
  
  $('#play_button').on("click", function() {
    //play game
  })

  document.addEventListener("keydown", function (e) {
    if (e.which == 39) {
      game.moveRight(game.currentBlock, game.board.grid);
      game.board.render();
    } else if (e.which == 37) {
      game.moveLeft(game.currentBlock, game.board.grid);
      game.board.render();      
    }
    e.preventDefault();
  })

})



