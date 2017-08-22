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
          grid[i].push({j,i});
        }
      }

      return grid;
      console.log(grid)
    }

    render() {
      let boardDisplay = '';
      for(let k=0; k<3; k++){
        boardDisplay+="<div class='row-empty'>"

        for (let m=0; m<this.width; m++) {
          let cellStatus = "";
          if (this.grid[m][k].piece) {

            cellStatus = "live-cell"
          }
          boardDisplay+=`<div class='cell-empty ${cellStatus}' data-x=${m} data-y=${k}></div></div>`
        
        }

        boardDisplay+='</div>'
      }
      for(let i=3; i < this.height+3; i++){
        boardDisplay += "<div class='row'>"
        for (let j=0; j<this.width; j++){
          let cellStatus = ""
          debugger
          if (this.grid[i][j].piece) {

            cellStatus = "live-cell"
          }
          boardDisplay += `<div class='cell ${cellStatus}' data-x=${j} data-y=${i}></div>`
        }
        boardDisplay +="</div>"
      }
      $('#board').html(boardDisplay)
    }
  }

})();

      // const status = cell.piece ? 'live-cell' : 'dead-cell'