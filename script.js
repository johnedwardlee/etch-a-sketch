// Globals
let gridSize = 32;
let mouseLock = false;
let color = '#000000';
let randLock = false;
let shadeLock = false;
let shader = 0.1;
const grid = document.getElementById('grid');
const gridStyle = getComputedStyle(grid);
const colorBtn = document.querySelector('.btn-color');
const randBtn = document.querySelector('.btn-rand');
const shadeBtn = document.querySelector('.btn-shade');
const gridSizeBtn = document.querySelector('.btn-size');
const clearBtn = document.querySelector('.btn-clear');
const eraserBtn = document.querySelector('.btn-eraser');
const midButtonTexts = document.querySelectorAll('.front');
const colorBox = document.getElementById('color-box');
// Functions
function fillBox(e) {
  if (e.type === 'mouseover' && !mouseLock) return;
  if (randLock){
    e.target.style.backgroundColor = '#' + Math.floor(Math.random()*16777215).toString(16);
  } else if(shadeLock){
    e.target.style.backgroundColor = hexToRGB(color, shader);
    shader += .1;
    if (shader > 1){
      shader = 0.1;
    }
  }
  else {
    e.target.style.backgroundColor = color;
  }
}

function clearGrid() {
  grid.innerHTML = '';
}

function drawGrid() {
  clearGrid();
  const length = parseFloat(gridStyle.width) / gridSize;
  for (let i = 0; i < gridSize ** 2; i += 1) {
    const box = document.createElement('div');
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

function selectColor() {
  randLock = false;
  shadeLock = false;
  const colorPicker = document.getElementById('color-picker');
  colorPicker.addEventListener('input', function () {
    color = this.value;
    colorBox.style.cssText = `background:${color}`;
  });
  colorPicker.click();
}

function selectErase() {
  randLock = false;
  shadeLock = false;
  color = '#ffff';
}

function selectRandom() {
  if (!randLock) {
    randLock = true;
  } else {
    randLock = false;
  }
}

function hexToRGB(hex, alpha) {
  let r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);
  if (alpha) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
      return "rgb(" + r + ", " + g + ", " + b + ")";
  }
}

function selectShade() {
  if (!shadeLock) {
    shadeLock = true;
  } else {
    shadeLock = false;
  }
}

// Main
midButtonTexts[2].textContent = `Grid Size: ${gridSize}`;
gridSizeBtn.addEventListener('click', setGridSize);
clearBtn.addEventListener('click', drawGrid);
colorBtn.addEventListener('click', selectColor);
eraserBtn.addEventListener('click', selectErase);
randBtn.addEventListener('click', selectRandom);
shadeBtn.addEventListener('click', selectShade);
document.body.onmousedown = () => (mouseLock = true);
document.body.onmouseup = () => (mouseLock = false);
drawGrid();
