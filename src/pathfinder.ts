/**
 * Enum representing possible states of a grid cell.
 * Using 'as const' for literal types and better performance.
 */

const GRID_CELL = { EMPTY: 0, WALL: 1, START: 2, TARGET: 3, PATH: 4 } as const;

/**
 * Standard 4-directional movement (Up, Down, Left, Right).
 */

const DIRECTIONS = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
] as const;

/**
 * Finds the shortest path in a grid using Breadth-First Search (BFS).
 * Works on a flat Uint8Array for memory efficiency.
 */

export function findPathTyped(
  startIdx: number,
  endIdx: number,
  grid: Uint8Array,
  width: number,
  height: number,
): number[] | null {
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
}

/**
 * Backtracks from the end node to the start node using the parents array.
 * Modifies the grid to mark the final path.
 */
function reconstructPath(
  endIdx: number,
  parents: Int32Array,
  grid: Uint8Array,
): number[] {
  const path: number[] = [];
  let temp = endIdx;

  while (temp !== -1) {
    // Mark empty cells as part of the path (avoid overwriting START/TARGET visuals)
    if (grid[temp] === GRID_CELL.EMPTY) {
      grid[temp] = GRID_CELL.PATH;
    }
    path.push(temp);
    temp = parents[temp]; // Move to the previous node in the path
  }

  // Reverse because we backtracked from Target -> Start
  return path.reverse();
}
