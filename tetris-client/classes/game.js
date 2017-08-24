const Game = (function createGameClass() {

  return class Game {

    constructor(name){
      this.name = name;
      this.score = 0;
      this.board = new Board(13, 26);

      // this.nextBlock = new Piece(Math.floor(Math.random()*6));
      this.addBlock();
    }

    addBlock(nextBlock = null) {
      if(nextBlock == null) {
        this.currentBlock = new Piece(Math.floor(Math.random()*6));  
      }
      else {
        this.currentBlock = nextBlock
      }
      this.nextBlock = new Piece(Math.floor(Math.random()*6));
      this.insertBlock();
      let intervalId = setInterval(() => {
       
        if (this.currentBlock.coordinates.y-2+this.currentBlock.height <= this.board.height && !this.detectPieceBelow(this.currentBlock)) {
          this.move(this.currentBlock, this.board.grid);
          this.clearFullRow(this.currentBlock);
        } else if (this.currentBlock.coordinates.y <= 2) {
          clearInterval(intervalId);
          console.log("Game Over")
          this.endGame();
        } else {
          clearInterval(intervalId);
          this.clearFullRow(this.currentBlock);
          this.addBlock(this.nextBlock);
        }
      }, 500)
    }

    removeBlock() {
      this.currentBlock.currentShape.forEach(shapeCoordinate => {
        this.board.grid[shapeCoordinate.y][shapeCoordinate.x].piece = null
      })
    }

    insertBlock() {
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
      if (piece.coordinates.y+piece.height <= this.board.height + 2) {
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
      let X1 = piece.currentShape[0].x 
      let X2 = piece.currentShape[1].x
      let X3 = piece.currentShape[2].x 
      let X4 = piece.currentShape[3].x

      let testX1 = piece.currentShape[0].x - 1
      let testX2 = piece.currentShape[1].x - 1
      let testX3 = piece.currentShape[2].x - 1
      let testX4 = piece.currentShape[3].x - 1

      let testY1 = piece.currentShape[0].y
      let testY2 = piece.currentShape[1].y
      let testY3 = piece.currentShape[2].y
      let testY4 = piece.currentShape[3].y

      let testArray = [[X1, testY1], [X2, testY2], [X3, testY3], [X4, testY4]]
      let testArray2 = [[testX1, testY1], [testX2, testY2], [testX3, testY3], [testX4, testY4]]
      
      let resultArray = []

      for (let i = 0; i < testArray2.length; i++) {
        let toBeInserted = true
        for (let j = 0; j < testArray.length; j++) {
          let testArray2Val = JSON.stringify(testArray2[i])
          let testArrayVal = JSON.stringify(testArray[j])
          if (testArray2Val == testArrayVal) {
            toBeInserted = false
          } 
        }
        if (toBeInserted) {
          resultArray.push(testArray2[i])
        }
      }

      let aliveCellTest = []

      for (let i = 0; i < resultArray.length; i++) {
        aliveCellTest[i] = document.querySelector(`[data-x='${resultArray[i][0]}'][data-y='${resultArray[i][1]}']`).className.includes('cell live-cell')
      }
      
      return aliveCellTest.includes(true)  
    }

    detectPieceRight(piece) {
      let X1 = piece.currentShape[0].x 
      let X2 = piece.currentShape[1].x
      let X3 = piece.currentShape[2].x 
      let X4 = piece.currentShape[3].x

      let testX1 = piece.currentShape[0].x + 1
      let testX2 = piece.currentShape[1].x + 1
      let testX3 = piece.currentShape[2].x + 1
      let testX4 = piece.currentShape[3].x + 1

      let testY1 = piece.currentShape[0].y
      let testY2 = piece.currentShape[1].y
      let testY3 = piece.currentShape[2].y
      let testY4 = piece.currentShape[3].y

      let testArray = [[X1, testY1], [X2, testY2], [X3, testY3], [X4, testY4]]
      let testArray2 = [[testX1, testY1], [testX2, testY2], [testX3, testY3], [testX4, testY4]]
      
      let resultArray = []

      for (let i = 0; i < testArray2.length; i++) {
        let toBeInserted = true
        for (let j = 0; j < testArray.length; j++) {
          let testArray2Val = JSON.stringify(testArray2[i])
          let testArrayVal = JSON.stringify(testArray[j])
          if (testArray2Val == testArrayVal) {
            toBeInserted = false
          } 
        }
        if (toBeInserted) {
          resultArray.push(testArray2[i])
        }
      }

      let aliveCellTest = []

      for (let i = 0; i < resultArray.length; i++) {
        aliveCellTest[i] = document.querySelector(`[data-x='${resultArray[i][0]}'][data-y='${resultArray[i][1]}']`).className.includes('cell live-cell')
      }
      
      return aliveCellTest.includes(true)       
      
    }

    detectPieceBelow(piece) { 
      let Y1 = piece.currentShape[0].y
      let Y2 = piece.currentShape[1].y
      let Y3 = piece.currentShape[2].y 
      let Y4 = piece.currentShape[3].y

      let testX1 = piece.currentShape[0].x
      let testX2 = piece.currentShape[1].x
      let testX3 = piece.currentShape[2].x
      let testX4 = piece.currentShape[3].x

      let testY1 = piece.currentShape[0].y + 1
      let testY2 = piece.currentShape[1].y + 1
      let testY3 = piece.currentShape[2].y + 1
      let testY4 = piece.currentShape[3].y + 1

      let testArray = [[testX1, Y1], [testX2, Y2], [testX3, Y3], [testX4, Y4]]
      let testArray2 = [[testX1, testY1], [testX2, testY2], [testX3, testY3], [testX4, testY4]]
      
      let resultArray = []

      for (let i = 0; i < testArray2.length; i++) {
        let toBeInserted = true
        for (let j = 0; j < testArray.length; j++) {
          let testArray2Val = JSON.stringify(testArray2[i])
          let testArrayVal = JSON.stringify(testArray[j])
          if (testArray2Val == testArrayVal) {
            toBeInserted = false
          } 
        }
        if (toBeInserted) {
          resultArray.push(testArray2[i])
        }
      }

      let aliveCellTest = []

      for (let i = 0; i < resultArray.length; i++) {
        aliveCellTest[i] = document.querySelector(`[data-x='${resultArray[i][0]}'][data-y='${resultArray[i][1]}']`).className.includes('cell live-cell')
      }
      
      return aliveCellTest.includes(true)       

    }

    detectPieceFurtherBelow(piece) {
      let y = piece.coordinates.y + piece.height + 1
      for (let i = y; i < this.board.height; i++) {
        let classBelow = document.querySelector(`[data-x='${piece.coordinates.x}'][data-y='${i}']`).className
        if (classBelow.includes('cell live-cell')) { 
          return this.board.height - i + piece.height
        } 
      }
      return this.board.height - y + piece.height
    }

    //this clears rows and updates the score accordingly
    clearFullRow(piece){
      for(let i=0; i < this.board.height+3; i++){
        let fullSquares = 0
        for (let j=0; j<this.board.width; j++){
          if ((document.querySelector(`[data-x='${j}'][data-y='${i}']`).className).includes('cell live-cell')){
            fullSquares += 1
          }
        }
        if (fullSquares==this.board.width && (!this.allowMoveDown(piece) || this.detectPieceBelow(piece))){
          for(let k=i; k>0; k--){
            this.board.grid[k]=this.board.grid[k-1]
            this.addRow();
          }
          this.score+=10;
          this.board.render()
        }
      }
      $('#score').html(`<h1>Score: ${this.score}</h1>`)
    }

    addRow() {
      let newRow = []
      for (let i = 0; i<this.board.width; i++) {
        newRow.push([])
      }
      this.board.grid[0]=newRow
    }
    endGame() {
      var board = document.getElementById("board")
      $('#board').html(`<div id='game-over'><h1>Game Over</h1></div>`)
      let dataFetcher = new TetrisAdapter;
      dataFetcher.createGame({name: this.name, score: this.score})
    }

  }

})();