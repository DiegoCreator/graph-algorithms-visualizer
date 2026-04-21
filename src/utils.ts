import { GRID_CELL } from "./constants";

/**
 * Backtracks from the end node to the start node using the parents array.
 * Modifies the grid to mark the final path.
 */
export function reconstructPath(
  endIdx: number,
  parents: Int32Array,
  grid: Uint8Array,
): number[] {
  const path: number[] = [];
  let temp = endIdx;

  while (temp !== -1) {
    // Mark empty cells as part of the path (avoid overwriting START/TARGET visuals)
    if (grid[temp] === GRID_CELL.EMPTY || grid[temp] === GRID_CELL.VISITED) {
      grid[temp] = GRID_CELL.PATH;
    }
    path.push(temp);
    temp = parents[temp]; // Move to the previous node in the path
  }

  // Reverse because we backtracked from Target -> Start
  return path.reverse();
}

export function benchmark(name: string, fn: () => any, iterations = 10) {
  fn();

  const times: number[] = [];
  for (let i = 0; i < iterations; i++) {
    const t0 = performance.now();
    fn();
    const t1 = performance.now();
    times.push(t1 - t0);
  }

  const avg = times.reduce((a, b) => a + b) / iterations;
  console.log(
    `${name} - Average: ${avg.toFixed(2)}ms (over ${iterations} runs)`,
  );
  return avg;
}
