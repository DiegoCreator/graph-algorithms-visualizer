import { CELL_COLORS } from "./constants";

export function drawGrid(grid: Uint8Array, gridSize: number) {
  const canvas = document.getElementById(
    "myCanvas",
  ) as HTMLCanvasElement | null;
  const ctx = canvas?.getContext("2d");

  if (!ctx || !canvas) throw new Error("Canvas element not found!");

  const cellSize = canvas.width / gridSize;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawGridCells(ctx, grid, gridSize, cellSize);
  drawGridLines(ctx, gridSize, cellSize, canvas.width, canvas.height);
}

function drawGridCells(
  ctx: CanvasRenderingContext2D,
  grid: Uint8Array,
  gridSize: number,
  cellSize: number,
) {
  for (let i = 0; i < grid.length; i++) {
    const color = CELL_COLORS[grid[i]];

    if (color) {
      const x = (i % gridSize) * cellSize;
      const y = Math.floor(i / gridSize) * cellSize;

      ctx.fillStyle = color;
      ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2);
    }
  }
}

function drawGridLines(
  ctx: CanvasRenderingContext2D,
  gridSize: number,
  cellSize: number,
  width: number,
  height: number,
) {
  if (gridSize <= 1000) {
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.lineWidth = 0.5;

    for (let i = 0; i <= gridSize; i++) {
      const pos = i * cellSize;

      ctx.moveTo(pos, 0);
      ctx.lineTo(pos, height);

      ctx.moveTo(0, pos);
      ctx.lineTo(width, pos);
    }
    ctx.stroke();
  }
}
