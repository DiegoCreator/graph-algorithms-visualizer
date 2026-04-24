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
  const gap = cellSize > 5 ? 1 : 0;
  for (let i = 0; i < grid.length; i++) {
    const color = CELL_COLORS[grid[i]];

    if (color) {
      const x = (i % gridSize) * cellSize;
      const y = Math.floor(i / gridSize) * cellSize;

      ctx.fillStyle = color;
      // Moving by 1px and shrinking by 2px creates a margin (gap) around the cell,
      // so the gridlines aren't completely obscured by the fill color
      ctx.fillRect(x + gap, y + gap, cellSize - gap * 2, cellSize - gap * 2);
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
  let step = 1;
  // We disable gridline drawing at very high density (over 1000 cells)
  // to avoid rendering performance issues and moiré.
  if (gridSize <= 1000) {
    if (gridSize >= 250 && gridSize <= 600) {
      step = 10;
    } else if (gridSize > 600) {
      step = 50;
    }

    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.lineWidth = 0.5;

    for (let i = 0; i <= gridSize; i += step) {
      const pos = i * cellSize;

      ctx.moveTo(pos, 0);
      ctx.lineTo(pos, height);

      ctx.moveTo(0, pos);
      ctx.lineTo(width, pos);
    }
    ctx.stroke();
  }
}
