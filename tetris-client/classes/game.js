const Game = (function createGameClass() {

  return class Game {

    constructor(name){
      this.name = name;
      this.score = 0;
      this.level = 1;
      this.rowsCleared = 0;
      this.board = new Board(13, 26, this);
      this.intervalTime = 550

      // this.nextBlock = new Piece(Math.floor(Math.random()*6));
      this.addBlock();
    }

    addBlock(nextBlock = null) {
      if(nextBlock == null) {
        this.currentBlock = new Piece(Math.floor(Math.random()*6), this.board, this);  
      }
      else {
        this.currentBlock = nextBlock
      }
      this.nextBlock = new Piece(Math.floor(Math.random()*6), this.board, this);
      this.insertBlock();
      let intervalId = setInterval(() => {
        if (this.currentBlock.coordinates.y-2+this.currentBlock.height <= this.board.height && !this.currentBlock.detectPieceBelow()) {
          this.currentBlock.move(this.currentBlock, this.board.grid);
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
      }, this.intervalTime)
    }

    removeBlock() {
      this.currentBlock.currentShape.forEach(shapeCoordinate => {
        this.board.grid[shapeCoordinate.y][shapeCoordinate.x].piece = null
      })
    }

    renderLevel() {
      let levelHTML = `<h1> Level: ${this.level} </h1>`
      $('#level').html(levelHTML); 
    }

    insertBlock() {
      this.currentBlock.currentShape.forEach(shapeCoordinate => {
        const cell = new Cell(shapeCoordinate.y, shapeCoordinate.x, this.currentBlock)
        //console.log(shapeCoordinate)
        
        this.board.grid[shapeCoordinate.y][shapeCoordinate.x] = cell
      })
    }


    //currentBlock is the entire Piece right now so current shape is just the underlying cells- so the array of hashes
    moveRight(piece, grid) {
      if (this.allowMoveRight(piece) && !piece.detectPieceRight()) {
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
      if (this.allowMoveLeft(piece) && !piece.detectPieceLeft()) {
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
      if (this.allowMoveDown(piece) && !piece.detectPieceBelow()) {
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
      while (this.allowMoveDown(piece) && !piece.detectPieceBelow()) {
        piece.currentShape.forEach(shapeCoordinate => {
          const cell = grid[shapeCoordinate.y][shapeCoordinate.x]
          cell.piece = null
        })
        piece.updatePosition(0,1)
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


    //this clears rows and updates the score accordingly
    clearFullRow(piece){
      let tetris = 0
      for(let i=0; i < this.board.height+3; i++){
        let fullSquares = 0
        for (let j=0; j<this.board.width; j++){
          if ((document.querySelector(`[data-x='${j}'][data-y='${i}']`).className).includes('cell live-cell')){
            fullSquares += 1
          }
        }
        if (fullSquares==this.board.width && (!this.allowMoveDown(piece) || piece.detectPieceBelow())){
          for(let k=i; k>0; k--){
            this.board.grid[k]=this.board.grid[k-1]
            this.board.addRow();
          }
          tetris += 1
          this.rowsCleared += 1
          if (this.rowsCleared >= 10) {
            this.level += 1;
            if (this.intervalTime > 100) {this.intervalTime -= 100;}
            this.rowsCleared -= 10;
            // $("#level-up").show();
            // setTimeout(function() {
            //   $("#level-up").hide();
            // }, 1000);
          }
          this.board.render()
        }
      }
      if (tetris == 1 || tetris == 2){
        this.score += 1000*tetris
      } else if (tetris == 3) {
        this.score += 4000
      } else if (tetris == 4) {
        this.score += 8000
      }
      $('#score').html(`<h1>Score: ${this.score}</h1>`)
    }


    endGame() {
      var board = document.getElementById("board")
      $('#board').html(`<div id='game-over'><h1>Game Over</h1></div>`)
      let dataFetcher = new TetrisAdapter;
      dataFetcher.createGame({name: this.name, score: this.score})
    }

  }

})();