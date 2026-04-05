export function drawGrid(grid: Uint8Array, gridSize: number) {
  const canvas = document.getElementById(
    "myCanvas",
  ) as HTMLCanvasElement | null;

  if (!canvas) {
    throw new Error("Canvas element not found!");
  }

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Canvas element not found!");
  }

  const cellSize = canvas.width / gridSize;

  ctx.strokeStyle = "red";
  ctx.lineWidth = 1;

  ctx.beginPath();

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < grid.length; i++) {
    if (grid[i] !== 0) {
      const x = (i % gridSize) * cellSize;
      const y = Math.floor(i / gridSize) * cellSize;

      if (grid[i] === 1) ctx.fillStyle = "#333";
      if (grid[i] === 2) ctx.fillStyle = "#2ECC71";
      if (grid[i] === 3) ctx.fillStyle = "#E74C3C";
      if (grid[i] === 4) ctx.fillStyle = "#F1C40F";

      ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2);
    }
  }

  if (gridSize <= 1000) {
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.lineWidth = 0.5;

    for (let i = 0; i <= gridSize; i++) {
      const pos = i * cellSize;

      ctx.moveTo(pos, 0);
      ctx.lineTo(pos, canvas.height);

      ctx.moveTo(0, pos);
      ctx.lineTo(canvas.width, pos);
    }
    ctx.stroke();
  }
}
