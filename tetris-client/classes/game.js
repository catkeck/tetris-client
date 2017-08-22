const Game = (function createGameClass() {

  return class Game {

    constructor(name){
      this.name = name;
      this.score = 0;
      this.board = new Board(13, 26);
      // this.currentBlock = new Piece(Math.floor(Math.random()*6));
      // this.nextBlock = new Piece(Math.floor(Math.random()*6));
      this.currentBlock = new Piece(0);
      // this.nextBlock = new Piece(0);
      this.insertBlock();
      setInterval(() => this.move(this.currentBlock, this.board.grid), 1000)
      
      // console.log(this.currentBlock.currentShape);
      //this.move(this.currentBlock, this.board.grid)
      // console.log(this.rotateRight(this.currentBlock.currentShape));
    }

    insertBlock() {
      // this.next();
      this.currentBlock.currentShape.forEach(shapeCoordinate => {
        const cell = new Cell(shapeCoordinate.x, shapeCoordinate.y, this.currentBlock)
        console.log(cell)
       // debugger
        this.board.grid[shapeCoordinate.x][shapeCoordinate.y] = cell
        // targetCell = cell
        // var modifiedCell = this.board.grid[shapeCoordinate.x][shapeCoordinate.y]
        // console.log(modifiedCell === cell)

      //   const cell = this.board.grid[shapeCoordinate.x][shapeCoordinate.y]
      //   //not sure what the below does 
      //   cell.state = {piece:,shapeId:shapeCoordinate.id}}
      // )
      // for (let i = 0; i < 3; i++){
      //   for (let j = 0; j < 3; j++) {
      //     this.board.grid[i][j]=this.currentBlock.currentShape[i][j];
      //   }
      // }
      })
      console.log("the board is")
      console.log(this.board.grid)
    }


    //currentBlock is the entire Piece right now so current shape is just the underlying cells- so the array of hashes
    move(piece, grid){
      console.log(piece)
      piece.currentShape.forEach(shapeCoordinate => {
        const cell = grid[shapeCoordinate.x][shapeCoordinate.y]
        console.log(cell)
        cell.piece = null
      })
      piece.updatePosition({x:piece.coordinates.x,y:piece.coordinates.y+1})
      this.insertBlock()
      this.board.render()
      //setTimeout(() => this.move(piece, grid), 1000 )
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