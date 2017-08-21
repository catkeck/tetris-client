$(document).ready(function() {
  let board = new Board(13,26);
  board.render();
  let status="playing";
  if(status === "playing"){
    let piece = new Piece();
    piece.shape.forEach(function())
    status = "not-playing";
  }
});

function initializePiece() {
  
}

