import './index.css';
import BlockGrid from './BlockGrid';

window.addEventListener('DOMContentLoaded', () =>
  new BlockGrid(20, 20).renderInitialGrid()
);
