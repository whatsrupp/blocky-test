import Block from './Block';

class BlockGrid {
  constructor(width = 10, height = 10) {
    this.width = width;
    this.height = height;
    this.grid = [];

    this.generateGrid();
  }

  generateGrid() {
    for (let x = 0; x < this.width; x++) {
      const col = [];
      for (let y = 0; y < this.height; y++) {
        col.push(new Block(x, y));
      }

      this.grid.push(col);
    }
  }

  render(el = document.getElementById('gridEl')) {
    const grid = document.getElementById('gridEl');
    while (grid.firstChild) {
      grid.removeChild(grid.firstChild);
    }
    this.grid.forEach((column, x) => {
      const id = 'col_' + x;
      const colEl = document.createElement('div');
      colEl.id = id;
      colEl.className = 'col';
      el.appendChild(colEl);

      column.forEach((row, y) => {
        const block = this.grid[x][y];
        const id = `block_${x}x${y}`;
        const blockEl = document.createElement('div');

        blockEl.id = id;
        blockEl.className = 'block';
        blockEl.style.background = block.colour;
        blockEl.addEventListener('click', evt => this.blockClicked(evt, block));
        colEl.appendChild(blockEl);
      });
    });
  }

  updateGridIndexes() {
    this.grid.forEach((column, x) => {
      column.forEach((block, y) => {
        block.x = x;
        block.y = y;
      });
    });
  }

  blockClicked(e, block) {
    const { x, y } = block;
    this.grid[x].splice(y, 1);
    this.updateGridIndexes();
    this.render();
  }
}

export default BlockGrid;
