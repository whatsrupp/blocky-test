import './index.css';
import BlockGrid from './BlockGrid';

window.addEventListener('DOMContentLoaded', () =>
  new BlockGrid(100, 100).render()
);
