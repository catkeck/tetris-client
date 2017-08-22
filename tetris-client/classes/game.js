const Game = (function createGameClass() {

  return class Game {

    constructor(name){
      this.name = name;
      this.score = 0;
      this.board = new Board(13, 26);
      // this.currentBlock = new Piece(Math.floor(Math.random()*6));
      // this.nextBlock = new Piece(Math.floor(Math.random()*6));
      this.addBlock();
    }

    addBlock() {
      this.currentBlock = new Piece(0);
      this.insertBlock();
      let intervalId = setInterval(() => {
        if (this.currentBlock.coordinates.y <= this.board.height && !this.detectPieceBelow(this.currentBlock)) {
          this.move(this.currentBlock, this.board.grid)
        } else {
          clearInterval(intervalId)
          this.addBlock();
        }
      }, 500)
    }

    insertBlock() {
      this.currentBlock.currentShape.forEach(shapeCoordinate => {
        const cell = new Cell(shapeCoordinate.y, shapeCoordinate.x, this.currentBlock)
        this.board.grid[shapeCoordinate.y][shapeCoordinate.x] = cell
      })
    }


    //currentBlock is the entire Piece right now so current shape is just the underlying cells- so the array of hashes
    move(piece, grid){
      piece.currentShape.forEach(shapeCoordinate => {
        const cell = grid[shapeCoordinate.y][shapeCoordinate.x]
        cell.piece = null
      })
      piece.updatePosition({x:piece.coordinates.x,y:piece.coordinates.y+1})
      this.insertBlock()
      this.board.render()
      //setTimeout(() => this.move(piece, grid), 1000 )
    }

    moveRight(piece, grid) {
      if (this.allowMoveRight(piece)) {
        piece.currentShape.forEach(shapeCoordinate => {
          const cell = grid[shapeCoordinate.y][shapeCoordinate.x]
          cell.piece = null
        })
        piece.updatePosition({x:piece.coordinates.x+1,y:piece.coordinates.y})
        this.insertBlock()
        this.board.render()
      }
    }

    moveLeft(piece, grid) {
      if (this.allowMoveLeft(piece) || this.detectPieceLeft(piece)) {
        piece.currentShape.forEach(shapeCoordinate => {
          const cell = grid[shapeCoordinate.y][shapeCoordinate.x]
          cell.piece = null
        })
        piece.updatePosition({x:piece.coordinates.x-1,y:piece.coordinates.y})
        this.insertBlock()
        this.board.render()
      }
    }

    moveDown(piece, grid) {
      if (this.allowMoveDown(piece)) {
        piece.currentShape.forEach(shapeCoordinate => {
          const cell = grid[shapeCoordinate.y][shapeCoordinate.x]
          cell.piece = null
        })
        piece.updatePosition({x:piece.coordinates.x,y:piece.coordinates.y+1})
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
      if (piece.coordinates.x < this.board.width-3) {
        return true;
      } else {
        return false;
      }
    }

    allowMoveDown(piece){
      if (piece.coordinates.y <= this.board.height) {
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
      return classBelow == 'cell live-cell'
    }

    detectPieceRight(piece) {
      let updatedX = piece.coordinates.x+4
      let classLeft = document.querySelector(`[data-x='${updatedX}'][data-y='${piece.coordinates.y}']`).className
      return classBelow == 'cell live-cell'
    }

    detectPieceBelow(piece) {
      let updatedY = piece.coordinates.y+2
      let classBelow = document.querySelector(`[data-x='${piece.coordinates.x}'][data-y='${updatedY}']`).className
      return classBelow == 'cell live-cell'                    
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

    next() {
      this.currentBlock = this.nextBlock
      this.nextBlock = new Piece(Math.floor(Math.random()*6));
    }
  }

})();