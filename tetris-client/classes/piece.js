const Piece = (function createPieceClass() {

  return class Piece {

    constructor(index, coordinates= {x:0,y:0}){
      this.coordinates = coordinates;
      this.currentShape = this.shapes()[index]
      // The coordinates refer to the top left point on the piece
     

     }

      // newShape(shape_index) {
      //   this.currentShape = this.shapes[shape_index]
      // }       

    shapes() {
      return [[
        {id:1, x:this.coordinates.x, y:this.coordinates.y},
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

    updatePosition(horizontal,vertical) {
      // this.coordinates = coordinates;
      for (let i = 0; i<4; i++) {
        this.currentShape[i]["x"]+= horizontal
        this.currentShape[i]["y"]+= vertical
      }
      this.coordinates = {x:this.currentShape[0]["x"],y:this.currentShape[0]["y"]}
    }



      //   return [
      //     [[0,1,0],
      //      [0,1,0],
      //      [0,1,0]],
      //     [[1,1,1],
      //      [0,0,1],
      //      [0,0,0]],
      //     [[1,1,0],
      //      [1,1,0],
      //      [0,0,0]],
      //     [[1,1,0],
      //      [0,1,1],
      //      [0,0,0]],
      //     [[0,1,1],
      //      [1,1,0],
      //      [0,0,0]],
      //     [[1,1,1],
      //      [0,1,0],
      //      [0,0,0]]
      //    ]
      // }          

  }
})()