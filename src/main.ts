import { findPathAStar } from "./a-star";
import { findPathBFS } from "./bfs";
import { GRID_CELL } from "./constants";
import { findPathDijkstra } from "./dijkstra";
import { drawGrid } from "./renderer";
import { benchmark } from "./utils";

const GRID_SIZE = 1000;
const grid = new Uint8Array(GRID_SIZE * GRID_SIZE);

const selector = document.getElementById("brush-selector");
const algorithm_selector = document.getElementById("algorithm-selector");

let currentBrush: number = GRID_CELL.WALL;
let currentAlgorithm: string = "bfs";

selector?.addEventListener("change", (event) => {
  const target = event.target as HTMLSelectElement;

  currentBrush = parseInt(target.value, 10);
});

algorithm_selector?.addEventListener("change", (event) => {
  const target = event.target as HTMLSelectElement;

  currentAlgorithm = target.value;
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

  const index = getMousePositionInGrid(event, canvas);

  if (index === null) return;

  if (event.buttons === 2) {
    removeField(index);
    drawGrid(grid, GRID_SIZE);
    return;
  }

  placeNode(index);
  drawGrid(grid, GRID_SIZE);
}

function getMousePositionInGrid(event: MouseEvent, canvas: HTMLCanvasElement) {
  const rect = canvas.getBoundingClientRect();
  const cellSize = canvas.width / GRID_SIZE;

  const x = Math.floor((event.clientX - rect.left) / cellSize);
  const y = Math.floor((event.clientY - rect.top) / cellSize);

  if (x < 0 || x >= grid.length || y < 0 || y >= GRID_SIZE) return null;

  const index = y * GRID_SIZE + x;
  return index;
}

function setStartNode(index: number) {
  grid[index] = GRID_CELL.START;
  startIdx = index;
  clickCount++;
}

function setTargetNode(index: number) {
  grid[index] = GRID_CELL.TARGET;
  endIdx = index;
  clickCount++;
}

function placeNode(index: number) {
  if (grid[index] === GRID_CELL.EMPTY) {
    if (clickCount === 0) {
      setStartNode(index);
    } else if (clickCount === 1) {
      setTargetNode(index);
    } else {
      grid[index] = currentBrush;
    }
  }
}

function removeField(index: number) {
  if (grid[index] === GRID_CELL.START || grid[index] === GRID_CELL.TARGET)
    return;
  grid[index] = GRID_CELL.EMPTY;
}

btnStartAlgorithm?.addEventListener("click", () => {
  if (startIdx !== null && endIdx !== null) {
    switch (currentAlgorithm) {
      case "bfs":
        console.log(
          findPathBFS(startIdx, endIdx, grid, GRID_SIZE, GRID_SIZE),

          benchmark("BFS Search", () =>
            findPathBFS(startIdx!, endIdx!, grid, GRID_SIZE, GRID_SIZE),
          ),
        );
        break;
      case "dijkstra":
        console.log(
          findPathDijkstra(startIdx, endIdx, grid, GRID_SIZE, GRID_SIZE),

          benchmark("Dijkstra Search", () =>
            findPathDijkstra(startIdx!, endIdx!, grid, GRID_SIZE, GRID_SIZE),
          ),
        );

        break;
      case "a*":
        console.log(
          findPathAStar(startIdx, endIdx, grid, GRID_SIZE, GRID_SIZE),

          benchmark("A* Search", () =>
            findPathAStar(startIdx!, endIdx!, grid, GRID_SIZE, GRID_SIZE),
          ),
        );
        break;
      default:
        alert("No algorithm selected");
    }
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
