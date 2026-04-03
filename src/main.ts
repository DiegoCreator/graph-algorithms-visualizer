import { findPathTyped } from "./pathfinder";
import { drawGrid } from "./renderer";

const GRID_SIZE = 50;
const grid = new Uint8Array(GRID_SIZE * GRID_SIZE);

const width = 50;
const height = 50;

const canvas = document.getElementById("myCanvas") as HTMLCanvasElement | null;
let startIdx: number | null = null;
let endIdx: number | null = null;

const btnStartBfs = document.getElementById("runBfs");
const btnReset = document.getElementById("resetBfs");
let isDrawing = false;
let clickCount = 0;

if (!canvas) {
  throw new Error("Canvas element not found!");
}

canvas.addEventListener("mousedown", (event) => {
  isDrawing = true;

  handleInput(event);
});

window.addEventListener("mouseup", () => {
  isDrawing = false;
});

canvas.addEventListener("mousemove", (event) => {
  if (isDrawing && clickCount >= 2) {
    handleInput(event);
  }
});

function handleInput(event: MouseEvent) {
  if (!canvas) {
    throw new Error("Canvas element not found!");
  }

  const rect = canvas.getBoundingClientRect();
  const cellSize = canvas.width / GRID_SIZE;
  const x = Math.floor((event.clientX - rect.left) / cellSize);
  const y = Math.floor((event.clientY - rect.top) / cellSize);
  const index = y * GRID_SIZE + x;

  if (index < 0 || index >= grid.length) return;

  if (grid[index] === 0) {
    if (clickCount === 0) {
      grid[index] = 2;
      startIdx = index;
      clickCount++;
    } else if (clickCount === 1) {
      grid[index] = 3;
      endIdx = index;
      clickCount++;
    } else {
      grid[index] = 1;
    }
    drawGrid(grid, GRID_SIZE);
  }
}

btnStartBfs?.addEventListener("click", () => {
  if (startIdx !== null && endIdx !== null) {
    console.log(findPathTyped(startIdx, endIdx, grid, width, height));
    drawGrid(grid, GRID_SIZE);
  } else {
    alert("You must first mark the Start and Finish lines on the board!");
  }
});

btnReset?.addEventListener("click", () => {
  grid.fill(0);
  clickCount = 0;
  startIdx = null;
  endIdx = null;
  drawGrid(grid, GRID_SIZE);
});

drawGrid(grid, GRID_SIZE);
