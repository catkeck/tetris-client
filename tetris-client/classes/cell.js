const Cell = (function createCellClass() {

  all = []

  return class Cell {

    constructor(x, y, piece=null){
      this.x = x;
      this.y = y;
      this.piece = piece;
      all.push(this);
    }

    static all() {
      return all;
    }

  }
})()