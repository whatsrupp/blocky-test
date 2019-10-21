import Block from './Block';

class BlockGrid {
  constructor(width = 10, height = 10) {
    this.width = width;
    this.height = height;
    this.grid = [];
    this.updatedColumns = new Set([]);
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
      colEl.style.width = `${100 / this.width}%`;

      colEl.id = id;
      colEl.className = 'col';
      el.appendChild(colEl);

      this.appendRowsToColumnElement(colEl, column, x);
    });
  }

  appendRowsToColumnElement(colEl, column, x) {
    column.forEach((row, y) => {
      const block = this.grid[x][y];
      const id = `block_${x}x${y}`;
      const blockEl = document.createElement('div');

      blockEl.id = id;
      blockEl.className = 'block';
      blockEl.style.background = block.colour;
      blockEl.style.height = `${100 / this.height}%`;

      blockEl.addEventListener('click', evt => this.blockClicked(evt, block));
      colEl.appendChild(blockEl);
    });
  }

  updateGridIndexes() {
    this.updatedColumns.forEach(x => {
      const column = this.grid[x];

      column.forEach((block, y) => {
        block.x = x;
        block.y = y;
      });
    });
  }

  deleteBlock(block) {
    const { x, y } = block;
    this.grid[x].splice(y, 1);
  }

  getBlockAt(x, y) {
    return this.grid && this.grid[x] && this.grid[x][y];
  }

  getUnvisitedNeighboursOfSameColour(block) {
    const { x, y, colour } = block;
    const left = this.getBlockAt(x - 1, y);
    const top = this.getBlockAt(x, y + 1);
    const right = this.getBlockAt(x + 1, y);
    const bottom = this.getBlockAt(x, y - 1);
    const neighbours = [left, top, right, bottom];

    const filtered = neighbours.reduce((acc, neighbour) => {
      if (
        neighbour &&
        neighbour.colour === colour &&
        !neighbour.willBeDeleted
      ) {
        acc.push(neighbour);
      }
      return acc;
    }, []);
    return filtered;
  }

  markBlockForDeletion(block) {
    block.willBeDeleted = true;
    this.updatedColumns.add(block.x);
    const neighbours = this.getUnvisitedNeighboursOfSameColour(block);
    neighbours.forEach(neighbour => {
      this.markBlockForDeletion(neighbour);
    });
  }

  deleteMarkedBlocks() {
    this.grid.forEach((column, x) => {
      for (let y = column.length - 1; y >= 0; y--) {
        const block = column[y];
        if (block.willBeDeleted) {
          this.deleteBlock(block);
        }
      }
    });
  }

  updateDom() {
    this.updatedColumns.forEach(x => {
      const columnElement = document.getElementById(`col_${x}`);
      while (columnElement.firstChild) {
        columnElement.removeChild(columnElement.firstChild);
      }

      const column = this.grid[x];

      this.appendRowsToColumnElement(columnElement, column, x);
    });
  }

  resetInternalState() {
    this.updatedColumns = new Set([]);
  }

  blockClicked(e, block) {
    this.markBlockForDeletion(block);
    this.deleteMarkedBlocks();
    this.updateGridIndexes();
    this.updateDom();
    this.resetInternalState();
  }
}

export default BlockGrid;
