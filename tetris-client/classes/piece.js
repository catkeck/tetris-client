const Piece = (function createPieceClass() {

  return class Piece {

    constructor(index, coordinates= {x:0,y:0}){
      this.coordinates = coordinates;
      this.currentShape = this.shapes()[0]
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
        {id:4, x:this.coordinates.x+1, y:this.coordinates.y+1}]
      ]
    }

    updatePosition(coordinates) {
      this.coordinates = coordinates;
      this.currentShape = [
        {id:1, x:this.coordinates.x, y:this.coordinates.y},
        {id:2, x:this.coordinates.x+1, y:this.coordinates.y},
        {id:3, x:this.coordinates.x+2, y:this.coordinates.y},
        {id:4, x:this.coordinates.x+1, y:this.coordinates.y+1}
     ]
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