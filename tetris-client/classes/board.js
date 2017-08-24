const Board = (function createBoardClass() {

  return class Board {

    constructor(width, height){
      this.width = width;
      this.height = height;
      this.grid = this.createGrid();
    }

    createGrid(){
      let grid = []
      for(let i=0; i < this.height+3; i++){
        grid.push([]);
        for (let j=0; j<this.width; j++){
          grid[i].push({j,i});
        }
      }
      this.addNewPieces(grid)
      return grid;
      
    }

    render() {
      let boardDisplay = '';
      for(let k=0; k<3; k++){
        boardDisplay+="<div class='row-empty'>"

        for (let m=0; m<this.width; m++) {
          let cellStatus = "";
          let color = "";
          if (this.grid[k][m].piece) {
            color = this.setColor(k,m);
            cellStatus = "live-cell"
          }
          boardDisplay+=`<div class='cell-empty ${cellStatus} ${color}' data-x=${m} data-y=${k}></div>`
        }

        boardDisplay+='</div>'
      }
      for(let i=3; i < this.height+3; i++){
        boardDisplay += "<div class='row'>"
        for (let j=0; j<this.width; j++){
          let cellStatus = "";
          let color = "";
          if (this.grid[i][j].piece) {
            color = this.setColor(i,j);
            cellStatus = "live-cell"   
          }
          boardDisplay += `<div class='cell ${cellStatus} ${color}' data-x=${j} data-y=${i}></div>`
        }
        boardDisplay +="</div>"
      }
      $('#board').html(boardDisplay)
    }

    setColor(i,j) {
      let color = ""
      if (this.grid[i][j].piece.index==0) {
        color="cyan";
      } else if (this.grid[i][j].piece.index==1) {
        color="blue";
      } else if (this.grid[i][j].piece.index==2) {
        color="orange";
      } else if (this.grid[i][j].piece.index==3) {
        color="yellow";
      } else if (this.grid[i][j].piece.index==4) {
        color="green";
      } else if (this.grid[i][j].piece.index==5) {
        color="purple";
      } else {
        color="red"
      }
      return color;
    }
  


  addNewPieces(grid) {
   let initialX = 0;
   for(let i = 0; i < 6; i++) {
     let piece = new Piece(5);
     piece.coordinates.x = initialX;
     piece.coordinates.y = 27
     grid[piece.coordinates.y][piece.coordinates.x].piece=piece;
     grid[piece.coordinates.y][piece.coordinates.x+1].piece=piece
     grid[piece.coordinates.y+1][piece.coordinates.x].piece=piece
     grid[piece.coordinates.y+1][piece.coordinates.x+1].piece=piece
     initialX += 2;
   }
   let initialX2 = 0;
   for(let i = 0; i < 6; i++) {
     let piece = new Piece(5);
     piece.coordinates.x = initialX2;
     piece.coordinates.y = 25
     grid[piece.coordinates.y][piece.coordinates.x].piece=piece;
     grid[piece.coordinates.y][piece.coordinates.x+1].piece=piece
     grid[piece.coordinates.y+1][piece.coordinates.x].piece=piece
     grid[piece.coordinates.y+1][piece.coordinates.x+1].piece=piece
     initialX2 += 2;
   }
}
} 


})();
