export const COLOURS = ['red', 'green', 'blue', 'yellow'];

class Block {
  constructor(x, y, colour) {
    this.x = x;
    this.y = y;

    this.colour = colour || COLOURS[Math.floor(Math.random() * COLOURS.length)];
  }
}

export default Block;
