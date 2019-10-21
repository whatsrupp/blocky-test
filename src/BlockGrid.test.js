import BlockGrid from './BlockGrid';
import Block from './Block';

describe('BlockGrid', () => {
  it('fills a multidimensional array of Blocks as its grid, according to the given width and height', () => {
    const grid = new BlockGrid(10, 10).grid;

    expect(grid.length).toBe(10);

    grid.forEach(column => {
      expect(column.length).toBe(10);

      column.forEach(block => {
        expect(block).toBeInstanceOf(Block);
      });
    });

    const gridB = new BlockGrid(3, 5).grid;

    expect(gridB.length).toBe(3);

    gridB.forEach(column => {
      expect(column.length).toBe(5);
    });
  });

  describe('when block is clicked', () => {
    const generateTestGrid = coloursGrid => {
      const testGrid = [];

      coloursGrid.forEach((column, i) => {
        const testColumn = [];
        column.forEach((colour, j) => {
          testColumn.push(new Block(i, j, colour));
        });
        testGrid.push(testColumn);
      });

      return testGrid;
    };

    let initialGrid;
    let expectedGrid;
    let clickCoordinates;

    afterEach(() => {
      const initial = generateTestGrid(initialGrid);
      BlockGrid.prototype.generateGrid = function() {
        this.grid = initial;
      };

      const { x, y } = clickCoordinates;
      const clickTarget = initial[x][y];

      const expected = generateTestGrid(expectedGrid);
      const blockGrid = new BlockGrid(initial.length, initial[0].length);
      blockGrid.blockClicked({}, clickTarget);
      expect(blockGrid.grid).toEqual(expected);
    });

    it('can remove one block', () => {
      initialGrid = [
        ['blue', 'blue', 'blue'],
        ['blue', 'yellow', 'blue'],
        ['blue', 'blue', 'blue'],
      ];

      expectedGrid = [
        ['blue', 'blue', 'blue'],
        ['blue', 'blue'],
        ['blue', 'blue', 'blue'],
      ];

      clickCoordinates = { x: 1, y: 1 };
    });
  });

  xit('good luck, have fun!', () => {});
});
