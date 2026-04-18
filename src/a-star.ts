import { GRID_CELL } from "./constants";
import { reconstructPath } from "./utils";
import { MinHeap } from "./MinHeap";
import { getValidNeighbors } from "./dijkstra";
import type { PathfindingFn } from "./pathfinder.types";

let WEIGHT_MAP = new Map<number, number>([
  [GRID_CELL.SAND, 5],
  [GRID_CELL.WATER, 10],
]);

export const findPathAStar: PathfindingFn = (
  startIdx: number,
  endIdx: number,
  grid: Uint8Array,
  width: number,
  height: number,
): number[] | null => {
  const queue = new MinHeap();
  const distances = new Float64Array(width * height).fill(Infinity);
  const parents = new Int32Array(width * height).fill(-1);

  distances[startIdx] = 0;

  queue.push({ index: startIdx, priority: 0 });

  while (!queue.isEmpty()) {
    const current = queue.pop();
    if (!current) break;

    if (
      current.priority >
      distances[current.index] +
        getManhattanDistance(current.index, endIdx, width)
    )
      continue;

    const currentIdx = current.index;

    if (currentIdx === endIdx) {
      return reconstructPath(endIdx, parents, grid);
    }

    for (const nIdx of getValidNeighbors(currentIdx, width, height, grid)) {
      const weight = WEIGHT_MAP.get(grid[nIdx]) ?? 1;

      const newDist = distances[currentIdx] + weight;

      if (newDist < distances[nIdx]) {
        distances[nIdx] = newDist;
        parents[nIdx] = currentIdx;
        const priority = newDist + getManhattanDistance(nIdx, endIdx, width);
        queue.push({ index: nIdx, priority: priority });
      }
    }
  }
  return null;
};

function getManhattanDistance(idx: number, endIdx: number, width: number) {
  const x1 = idx % width;
  const y1 = (idx / width) | 0;

  const x2 = endIdx % width;
  const y2 = (endIdx / width) | 0;

  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}
