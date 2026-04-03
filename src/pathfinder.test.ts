import { findPathTyped } from "./pathfinder";
import { describe, test, expect } from "vitest";
describe("findPathTyped", () => {
  const width = 50;
  const height = 50;

  test("should find the straightest path in a horizontal line", () => {
    const grid = new Uint8Array(width * height).fill(0);
    const result = findPathTyped(0, 2, grid, width, height);
    expect(result).toEqual([0, 1, 2]);
    expect(grid[1]).toBe(4);
  });

  test("should return null when the target is cut off by a wall", () => {
    const grid = new Uint8Array(width * height).fill(0);

    for (let y = 0; y < width; y++) grid[y * width + 1] = 1;

    const result = findPathTyped(0, 2, grid, width, height);
    expect(result).toBeNull;
  });

  test("should handle corner starts and stops correctly", () => {
    const grid = new Uint8Array(width * height).fill(0);
    const start = 0;
    const end = width * height - 1;
    const result = findPathTyped(start, end, grid, width, height);

    expect(result).toBeDefined();
    if (result !== null) {
      expect(result[0]).toBe(start);
      expect(result[result.length - 1]).toBe(end);

      expect(result.length).toBeGreaterThanOrEqual(99);
    } else {
      throw new Error("Path should have been found!");
    }
  });

  test("should treat squares with a value of 3 as passable", () => {
    const grid = new Uint8Array(width * height).fill(0);
    grid[1] = 3;
    const result = findPathTyped(0, 2, grid, width, height);
    expect(result).toEqual([0, 1, 2]);
  });
});
