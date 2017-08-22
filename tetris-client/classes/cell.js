const Cell = (function createCellClass() {

  all = []

  return class Cell {

    constructor(x, y, piece=null){
      this.status = "active"
      this.x = x;
      this.y = y;
      this.piece = piece;
      all.push(this);
      //this.state = {piece:piece, shapeId:null}
    }

    static all() {
      return all;
    }




  }
})()