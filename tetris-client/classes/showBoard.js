const showBoard = (function makeShowBoard() {
  return class showBoard {

    constructor(piece, game) {
      this.piece = piece;
      this.grid = this.createGrid();
      this.game = game;
    }

    addCoordinates() {
      this.piece.coordinates.x = 1
      this.piece.coordinates.y = 1
    }

    createGrid(){
      let grid = []
      for(let i=0; i < 5; i++){
        grid.push([]);
        for (let j=0; j<5; j++){
          grid[i].push({j,i});
        }
      }
      return grid;
    }

    clearGrid() {
      for (let i = 0; i<5; i ++){
        for (let j=0; j<5; j++){
          this.grid[i][j]=({j,i})
        }
      }
    }

    refresh() {
      this.clearGrid();
      this.addPiece();
      this.render();
    }

    addPiece() {
      this.addCoordinates();
      this.piece.currentShape.forEach(shapeCoordinate => {
        const cell = new Cell(shapeCoordinate.y, shapeCoordinate.x, this.piece)
        this.grid[shapeCoordinate.y+this.piece.coordinates.y][shapeCoordinate.x+this.piece.coordinates.x] = cell
      })
    }

    render() {
      let boardDisplay = '<h1>Next Piece:</h1>';
      for(let i=0; i < 5; i++){
        boardDisplay += "<div class='show-cell-row'>"
        for (let j=0; j < 5; j++){
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
      $('#show-board').html(boardDisplay)
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


  }
})();