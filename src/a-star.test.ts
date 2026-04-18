import { GRID_CELL } from "./constants";
import { findPathAStar } from "./a-star";
import { getManhattanDistance } from "./a-star";
import { describe, test, expect } from "vitest";
import { findPathDijkstra } from "./dijkstra";

describe("findPathTyped", () => {
  const width = 50;
  const height = 50;

  test("heuristic should return correct values", () => {
    const result = getManhattanDistance(0, 0, width);
    const result2 = getManhattanDistance(0, 3, width);
    const result3 = getManhattanDistance(0, width, width);
    expect(result).toBe(0);
    expect(result2).toBe(3);
    expect(result3).toBe(1);
  });

  // This test checks the algorithm's efficiency.
  // A* should visit fewer squares than Dijkstra thanks to the Manhattan heuristic.
  test("should A* be faster than Dijkstra", () => {
    const gridA = new Uint8Array(width * height).fill(0);
    const gridB = new Uint8Array(width * height).fill(0);

    findPathDijkstra(0, width * height - 1, gridA, width, height);
    findPathAStar(0, width * height - 1, gridB, width, height);

    const visitedA = gridA.reduce(
      (acc, curr) => (curr === GRID_CELL.VISITED ? acc + 1 : acc),
      0,
    );
    const visitedB = gridB.reduce(
      (acc, curr) => (curr === GRID_CELL.VISITED ? acc + 1 : acc),
      0,
    );

    expect(visitedB).toBeLessThan(visitedA);
  });
});
