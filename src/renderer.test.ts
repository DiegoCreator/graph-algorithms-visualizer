// @vitest-environment jsdom

import { drawGrid } from "./renderer";
import { describe, test, expect, vi, beforeEach } from "vitest";
describe("drawGrid", () => {
  const GRID_SIZE = 50;
  const width = 50;
  const height = 50;

  const mockCtx = {
    clearRect: vi.fn(),
    fillRect: vi.fn(),
    beginPath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    stroke: vi.fn(),
    fillStyle: "",
    strokeStyle: "",
    lineWidth: 0,
  };

  beforeEach(() => {
    document.body.innerHTML = "";
    vi.clearAllMocks();
  });

  test("should return 'Canvas element not found!' if myCanvas element does not exist in the document", () => {
    const grid = new Uint8Array(width * height).fill(0);
    expect(() => drawGrid(grid, GRID_SIZE)).toThrow(
      "Canvas element not found!",
    );
  });

  test("should set the correct fillStyle color for value 2", () => {
    const grid = new Uint8Array(width * height).fill(2);

    setupCanvas(50, 50);

    drawGrid(grid, GRID_SIZE);

    expect(mockCtx.fillStyle.toUpperCase()).toBe("#2ECC71");
  });

  test("should return 2500 times in a 50x50 grid", () => {
    const grid = new Uint8Array(width * height).fill(2);

    setupCanvas(50, 50);

    drawGrid(grid, GRID_SIZE);

    expect(mockCtx.fillRect).toHaveBeenCalledTimes(2500);
  });

  test("should correctly calculate the x and y position for the second element (index 1) ", () => {
    setupCanvas(100, 50);

    const grid = new Uint8Array(100);
    grid[1] = 1;

    drawGrid(grid, 10);

    const expectedCellSize = 100 / 10; // 10
    const expectedX = (1 % 10) * expectedCellSize + 1;
    const expectedY = Math.floor(1 / 10) * expectedCellSize + 1;

    expect(mockCtx.fillRect).toHaveBeenCalledWith(
      expectedX,
      expectedY,
      expectedCellSize - 2,
      expectedCellSize - 2,
    );
  });

  function setupCanvas(width: number, height: number) {
    const canvas = document.createElement("canvas");
    canvas.id = "myCanvas";
    canvas.width = width;
    canvas.height = height;
    canvas.getContext = vi.fn().mockReturnValue(mockCtx);
    document.body.appendChild(canvas);
    return canvas;
  }
});
