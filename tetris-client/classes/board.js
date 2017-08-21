const Board = (function createBoardClass() {

  return class Board {

    constructor(width, height){
      this.width = width;
      this.height = height;
      this.grid = this.createGrid();
    }

    createGrid(){
      let grid = []
      for(let i=0; i < this.height; i++){
        grid.push([]);
        for (let j=0; j<this.width; j++){
          grid[i].push(0);
        }
      }
      return grid;
    }

    render() {
      let boardDisplay = '';
      for(let i=0; i < this.height; i++){
        boardDisplay += "<div class='row'>"
        for (let j=0; j<this.width; j++){
          boardDisplay += `<div class='cell'>${this.grid[i][j]}</div>`
        }
        boardDisplay +="</div>"
      }
      $('#board').html(boardDisplay)
    }
  }

})();