// Globals
let gridSize = 16;
let mouseLock = false;
let color = '#000';
// Functions
function fillBox(e) {
  if (e.type === 'mouseover' && !mouseLock) return;
  e.target.style.backgroundColor = color;
}

function clearGrid() {
  grid.innerHTML = '';
}

function drawGrid() {
  clearGrid();
  let length = parseFloat(gridStyle.width) / gridSize;
  for (let i = 0; i < gridSize ** 2; i++) {
    let box = document.createElement('div');
    box.classList.add('grid-box');
    box.style.cssText = `width:${length}px;height:${length}px;`;
    box.addEventListener('mousedown', fillBox);
    box.addEventListener('mouseover', fillBox);
    grid.appendChild(box);
  }
}

function setGridSize() {
  gridSize = prompt('Enter a grid size');
  if (gridSize > 64) {
    gridSize = 64;
    alert('64 is the maximum grid size');
  } else if (gridSize < 1) {
    gridSize = 1;
    alert('1 is the minimum grid size');
  }
  midButtonTexts[2].textContent = `Grid Size: ${gridSize}`;
  drawGrid();
}

// Main
const grid = document.getElementById('grid');
const gridStyle = getComputedStyle(grid);
const colorBtn = document.querySelector('.btn-color');
const randBtn = document.querySelector('.btn-rand');
const shadeBtn = document.querySelector('.btn-shade');
const gridSizeBtn = document.querySelector('.btn-size');
const clearBtn = document.querySelector('.btn-clear');
const eraserBtn = document.querySelector('.btn-eraser');
const midButtonTexts = document.querySelectorAll('.front');
midButtonTexts[2].textContent = `Grid Size: ${gridSize}`;
gridSizeBtn.addEventListener('click', setGridSize);
clearBtn.addEventListener('click', clearGrid);
document.body.onmousedown = () => (mouseLock = true);
document.body.onmouseup = () => (mouseLock = false);
drawGrid();
