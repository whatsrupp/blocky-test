const purplePalette = ['#22162B', '#451F55', '#724E91', '#E54F6D', '#F8C630'];
const bluePalette = ['#07004D', '#2D82B7', '#42E2B8', '#F3DFBF', '#EB8A90'];
const greenPalette = ['#22577A', '#38A3A5', '#57CC99', '#80ED99', '#C7F9CC'];
const mutedPalette = ['#2B3A67', '#496A81', '#66999B', '#B3Af8F', '#FFC482'];
export const COLOURS = mutedPalette;

class Block {
  constructor(x, y, colour) {
    this.x = x;
    this.y = y;
    this.willBeDeleted = false;

    this.colour = colour || COLOURS[Math.floor(Math.random() * COLOURS.length)];
  }
}

export default Block;
