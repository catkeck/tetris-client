const Game = (function createGameClass() {

  return class Game {

    constructor(name){
      this.name = name;
      this.score = 0;
      this.board = new Board(13, 26);

      // this.nextBlock = new Piece(Math.floor(Math.random()*6));
      this.addBlock();
    }

    addBlock() {
      this.currentBlock = new Piece(Math.floor(Math.random()*6));
      this.insertBlock();
      let intervalId = setInterval(() => {
        if (this.currentBlock.coordinates.y-2+this.currentBlock.height <= this.board.height && !this.detectPieceBelow(this.currentBlock)) {
          this.move(this.currentBlock, this.board.grid);
          this.checkFullRow();
        } else if (this.currentBlock.coordinates.y <= 2) {
          clearInterval(intervalId);
          console.log("Game Over")
          this.endGame();
        } else {
          clearInterval(intervalId);
          this.checkFullRow();
          this.addBlock();
        }
      }, 500)
    }

    insertBlock() {
      let board = this.board
      this.currentBlock.currentShape.forEach(shapeCoordinate => {
        const cell = new Cell(shapeCoordinate.y, shapeCoordinate.x, this.currentBlock)
        //console.log(shapeCoordinate)
        
        this.board.grid[shapeCoordinate.y][shapeCoordinate.x] = cell
      })
    }


    //currentBlock is the entire Piece right now so current shape is just the underlying cells- so the array of hashes
    move(piece, grid){
      piece.currentShape.forEach(shapeCoordinate => {
        const cell = grid[shapeCoordinate.y][shapeCoordinate.x]
        cell.piece = null
      }) 
      piece.updatePosition(0,1)
      this.insertBlock()
      this.board.render()
      //setTimeout(() => this.move(piece, grid), 1000 )
    }

    moveRight(piece, grid) {
      if (this.allowMoveRight(piece) && !this.detectPieceRight(piece)) {
        piece.currentShape.forEach(shapeCoordinate => {
          const cell = grid[shapeCoordinate.y][shapeCoordinate.x]
          cell.piece = null
        })
        piece.updatePosition(1,0)
        this.insertBlock()
        this.board.render()
      }
    }

    moveLeft(piece, grid) {
      if (this.allowMoveLeft(piece) && !this.detectPieceLeft(piece)) {
        piece.currentShape.forEach(shapeCoordinate => {
          const cell = grid[shapeCoordinate.y][shapeCoordinate.x]
          cell.piece = null
        })
        piece.updatePosition(-1,0)
        this.insertBlock()
        this.board.render()
      }
    }

    moveDown(piece, grid) {
      if (this.allowMoveDown(piece) && !this.detectPieceBelow(piece)) {
        piece.currentShape.forEach(shapeCoordinate => {
          const cell = grid[shapeCoordinate.y][shapeCoordinate.x]
          cell.piece = null
        })
        piece.updatePosition(0,1)
        this.insertBlock()
        this.board.render()
      }
    }

    fastFall(piece, grid) {
      if (this.allowMoveDown(piece) && !this.detectPieceBelow(piece)) {
        piece.currentShape.forEach(shapeCoordinate => {
          const cell = grid[shapeCoordinate.y][shapeCoordinate.x]
          cell.piece = null
        })
        piece.updatePosition(0,this.detectPieceFurtherBelow(piece))
        console.log(piece.coordinates)
        this.insertBlock()
        this.board.render()
      }
    }

    allowMoveLeft(piece) {
      if (piece.coordinates.x > 0) {
        return true;
      } else {
        return false;
      }
    }

    allowMoveRight(piece){
      if (piece.coordinates.x < this.board.width-piece.width) {
        return true;
      } else {
        return false;
      }
    }

    allowMoveDown(piece){
      if (piece.coordinates.y+piece.height <= this.board.height) {
        return true;
      } else {
        return false;
      }
    }

    findMatchCell(x,y){
      let match = Cell.all().filter(function(cell){
        return (cell.x == x && cell.y == y)
      }) 
      return match
    }

    detectPieceLeft(piece) {
      let updatedX = piece.coordinates.x-1
      let classLeft = document.querySelector(`[data-x='${updatedX}'][data-y='${piece.coordinates.y}']`).className
      return classLeft == 'cell live-cell'
    }

    detectPieceRight(piece) {
      let updatedX = piece.coordinates.x+piece.width
      let classRight = document.querySelector(`[data-x='${updatedX}'][data-y='${piece.coordinates.y}']`).className
      return classRight == 'cell live-cell'
    }

    detectPieceBelow(piece) {
      let updatedY = piece.coordinates.y+piece.height
      let classBelow = document.querySelector(`[data-x='${piece.coordinates.x}'][data-y='${updatedY}']`).className
      return classBelow == 'cell live-cell'                    
    }

    detectPieceFurtherBelow(piece) {
      let y = piece.coordinates.y + piece.height + 1
      console.log(y)
      for (let i = y; i < this.board.height; i++) {
        let classBelow = document.querySelector(`[data-x='${piece.coordinates.x}'][data-y='${i}']`).className
        if (classBelow == 'cell live-cell') {
          console.log(i)
          return this.board.height - i + piece.height
        } 
      }
      return this.board.height - y + piece.height
    }

    //this brings in clearing in rows
    checkFullRow(){
      for(let i=0; i < this.board.grid.height+3; i++){
        let fullSquares = 0
        for (let j=0; j<this.board.width; j++){
          if ((document.querySelector(`[data-x='${j}'][data-y='${i}']`).className)=='cell live-cell'){
            fullSquares += 1
          }
        }
        if (fullSquares==this.board.width){
          for(let k=i; k>0; k--){
            this.board.grid[i]=this.board.grid[i+1]
          }
          this.board.render()
        }
      }
    }
    // rotateLeft(matrix) {
    //   let rotationMatrix = [[0,0,0],
    //                         [0,0,0],
    //                         [0,0,0]]
    //   rotationMatrix[0][0]=matrix[0][2];
    //   rotationMatrix[1][0]=matrix[0][1];
    //   rotationMatrix[2][0]=matrix[0][0];
    //   rotationMatrix[0][1]=matrix[1][2];
    //   rotationMatrix[1][1]=matrix[1][1];
    //   rotationMatrix[2][1]=matrix[1][0];
    //   rotationMatrix[0][2]=matrix[2][2];
    //   rotationMatrix[1][2]=matrix[2][1];
    //   rotationMatrix[2][2]=matrix[2][0];
    //   return rotationMatrix;
    // }

    // rotateRight(matrix) {
    //   let rotationMatrix = [[0,0,0],
    //                         [0,0,0],
    //                         [0,0,0]]
    //   rotationMatrix[0][0]=matrix[2][0];
    //   rotationMatrix[1][0]=matrix[2][1];
    //   rotationMatrix[2][0]=matrix[2][2];
    //   rotationMatrix[0][1]=matrix[1][0];
    //   rotationMatrix[1][1]=matrix[1][1];
    //   rotationMatrix[2][1]=matrix[1][2];
    //   rotationMatrix[0][2]=matrix[0][0];
    //   rotationMatrix[1][2]=matrix[0][1];
    //   rotationMatrix[2][2]=matrix[0][2];
    //   return rotationMatrix;
    // }
    //this isn't called anywhere right now
    next() {
      this.currentBlock = this.nextBlock
      this.nextBlock = new Piece(Math.floor(Math.random()*6));
    }

    //this doesn't currently work but is supposed to display end game at the end
    endGame() {
      var board = document.getElementById("board")
      board.style.zIndex='1';
      board.style.backgroundColor = "#FFFFFF";
    }

  }

})();