import { findPathBFS } from "./bfs";
import { GRID_CELL } from "./constants";
import { findPathDijkstra } from "./dijkstra";
import { drawGrid } from "./renderer";

const GRID_SIZE = 50;
const grid = new Uint8Array(GRID_SIZE * GRID_SIZE);

const width = 50;
const height = 50;

const selector = document.getElementById("brush-selector");

let currentBrush: number = GRID_CELL.WALL;

selector?.addEventListener("change", (event) => {
  const target = event.target as HTMLSelectElement;

  currentBrush = parseInt(target.value, 10);
});

const canvas = document.getElementById("myCanvas") as HTMLCanvasElement | null;
let startIdx: number | null = null;
let endIdx: number | null = null;

const btnStartAlgorithm = document.getElementById("runAlgorithm");
const btnReset = document.getElementById("reset");
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

canvas.addEventListener("contextmenu", (event) => {
  event.preventDefault();
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

  if (event.buttons === 2) {
    if (grid[index] !== GRID_CELL.START && grid[index] !== GRID_CELL.TARGET)
      grid[index] = GRID_CELL.EMPTY;
    drawGrid(grid, GRID_SIZE);
    return;
  }

  if (event.buttons === 1) {
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
        grid[index] = currentBrush;
      }
      drawGrid(grid, GRID_SIZE);
    }
  }
}

btnStartAlgorithm?.addEventListener("click", () => {
  if (startIdx !== null && endIdx !== null) {
    console.log(findPathDijkstra(startIdx, endIdx, grid, width, height));
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
