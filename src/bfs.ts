import { GRID_CELL, DIRECTIONS } from "./constants";
import { reconstructPath } from "./utils";
import type { PathfindingFn } from "./pathfinder.types";

/**
 * Finds the shortest path in a grid using Breadth-First Search (BFS).
 * Works on a flat Uint8Array for memory efficiency.
 */

export const findPathBFS: PathfindingFn = (
  startIdx: number,
  endIdx: number,
  grid: Uint8Array,
  width: number,
  height: number,
): number[] | null => {
  // Use a simple array as a queue for BFS.
  // For very large grids, a circular buffer or specialized Queue would be faster than shift().
  const queue: number[] = [startIdx];
  const visited = new Uint8Array(width * height);
  const parents = new Int32Array(width * height).fill(-1);

  visited[startIdx] = 1;

  // Here, we use a 'head' pointer to avoid O(n) shift() operations.
  let head = 0;

  while (head < queue.length) {
    const currentIdx = queue[head++];

    if (currentIdx !== startIdx && currentIdx !== endIdx) {
      grid[currentIdx] = GRID_CELL.VISITED;
    }

    if (currentIdx === endIdx) {
      return reconstructPath(endIdx, parents, grid);
    }

    // Convert flat index back to 2D coordinates
    const cx = currentIdx % width;
    const cy = (currentIdx / width) | 0; // faster Math.floor

    for (let i = 0; i < DIRECTIONS.length; i++) {
      const [dx, dy] = DIRECTIONS[i];
      const nx = cx + dx;
      const ny = cy + dy;

      // Boundary check
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const nIdx = ny * width + nx;

        // Check if the cell is traversable and hasn't been visited yet
        if (
          visited[nIdx] === 0 &&
          (grid[nIdx] === GRID_CELL.EMPTY || grid[nIdx] === GRID_CELL.TARGET)
        ) {
          visited[nIdx] = 1;
          parents[nIdx] = currentIdx; // Store reference to parent for backtracking
          queue.push(nIdx);
        }
      }
    }
  }
  return null;
};
