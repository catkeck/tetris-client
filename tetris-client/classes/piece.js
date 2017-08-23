const Piece = (function createPieceClass() {

  return class Piece {

    constructor(index, coordinates= {x:0,y:0}){
      this.index = index
      this.coordinates = coordinates;
      this.currentShape = this.shapes()[index]
        // The coordinates refer to the top left point on the piece
      this.height = this.getHeight(index)
      this.width = this.getWidth(index)
      this.state = 1

     }    

    rotate(){
      if (this.state==1) {
        this.state = 2;
        this.currentShape = this.shapes2()[this.index]
      } else if (this.state==2) {
        this.state = 3;
        this.currentShape = this.shapes3()[this.index]
      } else if (this.state==3) {
        this.state = 4;
        this.currentShape = this.shapes4()[this.index]
      } else if (this.state==4) {
        this.state = 1;
        this.currentShape = this.shapes()[this.index]
      }
      this.height, this.width = this.width, this.height
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
        [{id:1, x:this.coordinates.x, y:this.coordinates.y+1},
        {id:2, x:this.coordinates.x+1, y:this.coordinates.y},
        {id:3, x:this.coordinates.x+1, y:this.coordinates.y+1},
        {id:4, x:this.coordinates.x+2, y:this.coordinates.y}],
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
        {id:2, x:this.coordinates.x, y:this.coordinates.y+1},
        {id:3, x:this.coordinates.x+1, y:this.coordinates.y+1},
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
        [{id:1, x:this.coordinates.x, y:this.coordinates.y+1},
        {id:2, x:this.coordinates.x+1, y:this.coordinates.y},
        {id:3, x:this.coordinates.x+1, y:this.coordinates.y+1},
        {id:4, x:this.coordinates.x+2, y:this.coordinates.y}],
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

  }
})()


















