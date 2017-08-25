const Piece = (function createPieceClass() {

  return class Piece {

    constructor(index, board, game, coordinates= {x:0,y:0}){
      this.index = index
      this.coordinates = coordinates;
      this.currentShape = this.shapes()[index];
        // The coordinates refer to the top left point on the piece
      this.height = this.getHeight(index);
      this.width = this.getWidth(index);
      this.state = 1;
      this.board = board;
      this.game = game;

     }    

     //this method rotates the shape
    rotate(){
      const temp = this.width
      this.width = this.height
      this.height = temp
      if (this.state==1) {
        this.state = 2;
        this.checkTempShape(this.shapes2()[this.index])
      } else if (this.state==2) {
        this.state = 3;
        this.checkTempShape(this.shapes3()[this.index])
      } else if (this.state==3) {
        this.state = 4;
        this.checkTempShape(this.shapes4()[this.index])
      } else if (this.state==4) {
        this.state = 1;
        this.checkTempShape(this.shapes()[this.index])
      }
    }

    //this method checks if the new shape conflicts with the board
    checkTempShape(potentialResult) {
      let tempShape = new Piece(this.index+1, this.board, this.game, this.coordinates)
      tempShape.width = this.width
      tempShape.height = this.height
      if (tempShape.coordinates.x > 0 && tempShape.coordinates.x < 13-tempShape.width && tempShape.coordinates.y+tempShape.height <= 28 && !this.checkCells(tempShape.currentShape, this.currentShape)) {
          this.clearCells();
          this.currentShape = potentialResult
      }
    }

    //this method checks if the cells in the new shape conflict with any shapes on the board
    checkCells(potentialShape, currentShape) {

      let currentShapeArray = [[currentShape[0].x, currentShape[0].y], [currentShape[1].x, currentShape[1].y], [currentShape[2].x, currentShape[2].y], [currentShape[3].x, currentShape[3].y]]
      let potentialShapeArray = [[potentialShape[0].x, potentialShape[0].y], [potentialShape[1].x, potentialShape[1].y], [potentialShape[2].x, potentialShape[2].y], [potentialShape[3].x, potentialShape[3].y]]
      
      let resultArray = this.getOverlap(potentialShapeArray, currentShapeArray);

      return this.checkForAliveCells(resultArray)
    }

    getOverlap(potentialShapeArray, currentShapeArray) {
      let resultArray = []
      for (let i = 0; i < potentialShapeArray.length; i++) {
        let toBeInserted = true
        for (let j = 0; j < currentShapeArray.length; j++) {
          let potentialShapeArrayVal = JSON.stringify(potentialShapeArray[i])
          let currentShapeArrayVal = JSON.stringify(currentShapeArray[j])
          if (potentialShapeArrayVal == currentShapeArrayVal) {
            toBeInserted = false
          } 
        }
        if (toBeInserted) {
          resultArray.push(potentialShapeArray[i])
        }
      }
      return resultArray;
    }

    checkForAliveCells(resultArray) {
      let aliveCellTest = []
      console.log(resultArray)
      for (let i = 0; i < resultArray.length; i++) {
        aliveCellTest[i] = document.querySelector(`[data-x='${resultArray[i][0]}'][data-y='${resultArray[i][1]}']`).className.includes('cell live-cell')
      }
      return aliveCellTest.includes(true)
    }

    clearCells(){
      this.currentShape.forEach(function (element){

        let x = element.x
        let y = element.y
        let cell = document.querySelector(`[data-x='${x}'][data-y='${y}']`)
        cell.removeAttribute("class")
        cell.className = "cell"
      })
    }


    shapes() {
      return [
        [{id:1, x:this.coordinates.x, y:this.coordinates.y},
        {id:2, x:this.coordinates.x+1, y:this.coordinates.y},
        {id:3, x:this.coordinates.x+2, y:this.coordinates.y},
        {id:4, x:this.coordinates.x+1, y:this.coordinates.y+1}],
        [{id:1, x:this.coordinates.x, y:this.coordinates.y},
        {id:2, x:this.coordinates.x, y:this.coordinates.y+1},
        {id:3, x:this.coordinates.x, y:this.coordinates.y+2},
        {id:4, x:this.coordinates.x, y:this.coordinates.y+3}],
        [{id:1, x:this.coordinates.x, y:this.coordinates.y},
        {id:2, x:this.coordinates.x+1, y:this.coordinates.y},
        {id:3, x:this.coordinates.x+1, y:this.coordinates.y+1},
        {id:4, x:this.coordinates.x+2, y:this.coordinates.y+1}],
        [{id:1, x:this.coordinates.x, y:this.coordinates.y},
        {id:2, x:this.coordinates.x, y:this.coordinates.y+1},
        {id:3, x:this.coordinates.x+1, y:this.coordinates.y+1},
        {id:4, x:this.coordinates.x+2, y:this.coordinates.y+1}],
        [{id:1, x:this.coordinates.x, y:this.coordinates.y+1},
        {id:2, x:this.coordinates.x+1, y:this.coordinates.y+1},
        {id:3, x:this.coordinates.x+2, y:this.coordinates.y+1},
        {id:4, x:this.coordinates.x+2, y:this.coordinates.y}],
        [{id:1, x:this.coordinates.x, y:this.coordinates.y},
        {id:2, x:this.coordinates.x+1, y:this.coordinates.y},
        {id:3, x:this.coordinates.x, y:this.coordinates.y+1},
        {id:4, x:this.coordinates.x+1, y:this.coordinates.y+1}],
        [{id:1, x:this.coordinates.x, y:this.coordinates.y+1},
        {id:2, x:this.coordinates.x+1, y:this.coordinates.y+1},
        {id:3, x:this.coordinates.x+1, y:this.coordinates.y},
        {id:4, x:this.coordinates.x+2, y:this.coordinates.y}]
      ]
    }

    shapes2(){
      return [[
        {id:1, x:this.coordinates.x, y:this.coordinates.y+1},
        {id:2, x:this.coordinates.x+1, y:this.coordinates.y+1},
        {id:3, x:this.coordinates.x+1, y:this.coordinates.y},
        {id:4, x:this.coordinates.x+1, y:this.coordinates.y+2}],
        [{id:1, x:this.coordinates.x, y:this.coordinates.y},
        {id:2, x:this.coordinates.x+1, y:this.coordinates.y},
        {id:3, x:this.coordinates.x+2, y:this.coordinates.y},
        {id:4, x:this.coordinates.x+3, y:this.coordinates.y}],
        [{id:1, x:this.coordinates.x+1, y:this.coordinates.y},
        {id:2, x:this.coordinates.x, y:this.coordinates.y+1},
        {id:3, x:this.coordinates.x+1, y:this.coordinates.y+1},
        {id:4, x:this.coordinates.x, y:this.coordinates.y+2}],
        [{id:1, x:this.coordinates.x, y:this.coordinates.y+2},
        {id:2, x:this.coordinates.x, y:this.coordinates.y+1},
        {id:3, x:this.coordinates.x, y:this.coordinates.y},
        {id:4, x:this.coordinates.x+1, y:this.coordinates.y}],
        [{id:1, x:this.coordinates.x, y:this.coordinates.y},
        {id:2, x:this.coordinates.x, y:this.coordinates.y+1},
        {id:3, x:this.coordinates.x, y:this.coordinates.y+2},
        {id:4, x:this.coordinates.x+1, y:this.coordinates.y+2}],
        [{id:1, x:this.coordinates.x, y:this.coordinates.y},
        {id:2, x:this.coordinates.x+1, y:this.coordinates.y},
        {id:3, x:this.coordinates.x, y:this.coordinates.y+1},
        {id:4, x:this.coordinates.x+1, y:this.coordinates.y+1}],
        [{id:1, x:this.coordinates.x, y:this.coordinates.y},
        {id:2, x:this.coordinates.x, y:this.coordinates.y+1},
        {id:3, x:this.coordinates.x+1, y:this.coordinates.y+1},
        {id:4, x:this.coordinates.x+1, y:this.coordinates.y+2}]
      ]
    }

    shapes3(){
      return [[
        {id:1, x:this.coordinates.x, y:this.coordinates.y+1},
        {id:2, x:this.coordinates.x+1, y:this.coordinates.y},
        {id:3, x:this.coordinates.x+1, y:this.coordinates.y+1},
        {id:4, x:this.coordinates.x+2, y:this.coordinates.y+1}],
        [{id:1, x:this.coordinates.x, y:this.coordinates.y},
        {id:2, x:this.coordinates.x, y:this.coordinates.y+1},
        {id:3, x:this.coordinates.x, y:this.coordinates.y+2},
        {id:4, x:this.coordinates.x, y:this.coordinates.y+3}],
        [{id:1, x:this.coordinates.x, y:this.coordinates.y},
        {id:2, x:this.coordinates.x+1, y:this.coordinates.y},
        {id:3, x:this.coordinates.x+1, y:this.coordinates.y+1},
        {id:4, x:this.coordinates.x+2, y:this.coordinates.y+1}],
        [{id:1, x:this.coordinates.x, y:this.coordinates.y},
        {id:2, x:this.coordinates.x+1, y:this.coordinates.y},
        {id:3, x:this.coordinates.x+2, y:this.coordinates.y},
        {id:4, x:this.coordinates.x+2, y:this.coordinates.y+1}],
        [{id:1, x:this.coordinates.x, y:this.coordinates.y},
        {id:2, x:this.coordinates.x, y:this.coordinates.y+1},
        {id:3, x:this.coordinates.x+1, y:this.coordinates.y},
        {id:4, x:this.coordinates.x+2, y:this.coordinates.y}],
        [{id:1, x:this.coordinates.x, y:this.coordinates.y},
        {id:2, x:this.coordinates.x+1, y:this.coordinates.y},
        {id:3, x:this.coordinates.x, y:this.coordinates.y+1},
        {id:4, x:this.coordinates.x+1, y:this.coordinates.y+1}],
        [{id:1, x:this.coordinates.x, y:this.coordinates.y+1},
        {id:2, x:this.coordinates.x+1, y:this.coordinates.y+1},
        {id:3, x:this.coordinates.x+1, y:this.coordinates.y},
        {id:4, x:this.coordinates.x+2, y:this.coordinates.y}]
      ]
    }

    shapes4(){
      return [[
        {id:1, x:this.coordinates.x, y:this.coordinates.y},
        {id:2, x:this.coordinates.x, y:this.coordinates.y+1},
        {id:3, x:this.coordinates.x, y:this.coordinates.y+2},
        {id:4, x:this.coordinates.x+1, y:this.coordinates.y+1}],
        [{id:1, x:this.coordinates.x, y:this.coordinates.y},
        {id:2, x:this.coordinates.x+1, y:this.coordinates.y},
        {id:3, x:this.coordinates.x+2, y:this.coordinates.y},
        {id:4, x:this.coordinates.x+3, y:this.coordinates.y}],
        [{id:1, x:this.coordinates.x+1, y:this.coordinates.y},
        {id:2, x:this.coordinates.x, y:this.coordinates.y+1},
        {id:3, x:this.coordinates.x+1, y:this.coordinates.y+1},
        {id:4, x:this.coordinates.x, y:this.coordinates.y+2}],
        [{id:1, x:this.coordinates.x+1, y:this.coordinates.y},
        {id:2, x:this.coordinates.x+1, y:this.coordinates.y+1},
        {id:3, x:this.coordinates.x+1, y:this.coordinates.y+2},
        {id:4, x:this.coordinates.x, y:this.coordinates.y+2}],
        [{id:1, x:this.coordinates.x, y:this.coordinates.y},
        {id:2, x:this.coordinates.x+1, y:this.coordinates.y},
        {id:3, x:this.coordinates.x+1, y:this.coordinates.y+1},
        {id:4, x:this.coordinates.x+1, y:this.coordinates.y+2}],
        [{id:1, x:this.coordinates.x, y:this.coordinates.y},
        {id:2, x:this.coordinates.x+1, y:this.coordinates.y},
        {id:3, x:this.coordinates.x, y:this.coordinates.y+1},
        {id:4, x:this.coordinates.x+1, y:this.coordinates.y+1}],
        [{id:1, x:this.coordinates.x, y:this.coordinates.y},
        {id:2, x:this.coordinates.x, y:this.coordinates.y+1},
        {id:3, x:this.coordinates.x+1, y:this.coordinates.y+1},
        {id:4, x:this.coordinates.x+1, y:this.coordinates.y+2}]
      ]
    }

    getHeight(index) {
      if (index==0||index==2||index==3||index==4||index==5||index==6){
        return 2;
      } else if (index==1){
        return 4;
      }
    }


    getWidth(index){
      if (index==0||index==2||index==3||index==4||index==6) {
        return 3;
      } else if (index==1){
        return 1;
      } else if (index==5){
        return 2;
      }
    }


    updatePosition(horizontal,vertical) {
      // this.coordinates = coordinates;
      for (let i = 0; i<4; i++) {
        this.currentShape[i]["x"]+= horizontal
        this.currentShape[i]["y"]+= vertical
      }
      let lowestNumberX = Number.POSITIVE_INFINITY;
      let lowestNumberY = Number.POSITIVE_INFINITY;

      for (let j = 0; j < 4; j++) {
        if (this.currentShape[j]["x"] < lowestNumberX) {
          lowestNumberX = this.currentShape[j]["x"]
        }
        if (this.currentShape[j]["y"] < lowestNumberY) {
          lowestNumberY = this.currentShape[j]["y"]
        }
      }
      this.coordinates = {x:lowestNumberX,y:lowestNumberY}
    }

 

    detectPieceLeft() {
      let X1 = this.currentShape[0].x 
      let X2 = this.currentShape[1].x
      let X3 = this.currentShape[2].x 
      let X4 = this.currentShape[3].x

      let testX1 = this.currentShape[0].x - 1
      let testX2 = this.currentShape[1].x - 1
      let testX3 = this.currentShape[2].x - 1
      let testX4 = this.currentShape[3].x - 1

      let testY1 = this.currentShape[0].y
      let testY2 = this.currentShape[1].y
      let testY3 = this.currentShape[2].y
      let testY4 = this.currentShape[3].y

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

  detectPieceRight() {
    let X1 = this.currentShape[0].x 
    let X2 = this.currentShape[1].x
    let X3 = this.currentShape[2].x 
    let X4 = this.currentShape[3].x

    let testX1 = this.currentShape[0].x + 1
    let testX2 = this.currentShape[1].x + 1
    let testX3 = this.currentShape[2].x + 1
    let testX4 = this.currentShape[3].x + 1

    let testY1 = this.currentShape[0].y
    let testY2 = this.currentShape[1].y
    let testY3 = this.currentShape[2].y
    let testY4 = this.currentShape[3].y

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

    detectPieceBelow() { 
      let Y1 = this.currentShape[0].y
      let Y2 = this.currentShape[1].y
      let Y3 = this.currentShape[2].y 
      let Y4 = this.currentShape[3].y

      let testX1 = this.currentShape[0].x
      let testX2 = this.currentShape[1].x
      let testX3 = this.currentShape[2].x
      let testX4 = this.currentShape[3].x

      let testY1 = this.currentShape[0].y + 1
      let testY2 = this.currentShape[1].y + 1
      let testY3 = this.currentShape[2].y + 1
      let testY4 = this.currentShape[3].y + 1

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

    move(){
      this.currentShape.forEach(shapeCoordinate => {
        const cell = this.board.grid[shapeCoordinate.y][shapeCoordinate.x]
        cell.piece = null
      }) 
      this.updatePosition(0,1)
      this.game.insertBlock()
      this.board.render()
      //setTimeout(() => this.move(piece, grid), 1000 )
    }
  }
})()

