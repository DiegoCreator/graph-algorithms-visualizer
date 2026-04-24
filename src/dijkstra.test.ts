import { GRID_CELL } from "./constants";
import { findPathDijkstra } from "./dijkstra";
import { describe, test, expect } from "vitest";

describe("findPathTyped", () => {
  const width = 50;
  const height = 50;

  test("should find the straightest path in a horizontal line", () => {
    const grid = new Uint8Array(width * height).fill(0);
    const result = findPathDijkstra(0, 2, grid, width, height);
    expect(result).toEqual([0, 1, 2]);
    expect(grid[1]).toBe(4);
  });

  test("should return null when the target is cut off by a wall", () => {
    const grid = new Uint8Array(width * height).fill(0);

    for (let y = 0; y < width; y++) grid[y * width + 1] = GRID_CELL.WALL;

    const result = findPathDijkstra(0, 2, grid, width, height);
    expect(result).toBeNull();
  });

  test("should choose a longest path if there is a wall", () => {
    const grid = new Uint8Array(width * height).fill(0);

    for (let y = 0; y < 3; y++) grid[y * width + 1] = GRID_CELL.WALL;

    const result = findPathDijkstra(0, 2, grid, width, height);
    expect(result).not.toBeNull();
  });

  test("should choose a longest path if it's more profitable", () => {
    const grid = new Uint8Array(width * height).fill(0);

    grid[1] = GRID_CELL.WATER;

    const result = findPathDijkstra(0, 2, grid, width, height);
    expect(result).not.toContain(1);
  });
});
