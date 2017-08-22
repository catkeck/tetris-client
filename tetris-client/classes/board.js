const Board = (function createBoardClass() {

  return class Board {

    constructor(width, height){
      this.width = width;
      this.height = height;
      this.grid = this.createGrid();
    }

    createGrid(){
      let grid = []
      for(let i=0; i < this.height+3; i++){
        grid.push([]);
        for (let j=0; j<this.width+3; j++){
          grid[i].push({i,j});
        }
      }
      return grid;
    }

    render() {
      let boardDisplay = '';
      for(let k=0; k<3; k++){
        boardDisplay+="<div class='row-empty'>"
        for (let m=0; m<this.width; m++) {
          boardDisplay+=`<div class='cell-empty' data-x=${k} data-y=${m}></div></div>`
        }
        boardDisplay+='</div>'
      }
      for(let i=3; i < this.height+3; i++){
        boardDisplay += "<div class='row'>"
        for (let j=0; j<this.width; j++){
          boardDisplay += `<div class='cell' data-x=${i} data-y=${j}></div>`
        }
        boardDisplay +="</div>"
      }
      $('#board').html(boardDisplay)
    }
  }

})();

      // const status = cell.piece ? 'live-cell' : 'dead-cell'