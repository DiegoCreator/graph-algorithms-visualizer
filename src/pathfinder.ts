const GRID_CELL = { EMPTY: 0, WALL: 1, START: 2, TARGET: 3, PATH: 4 } as const;

const DIRECTIONS = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
] as const;

export function findPathTyped(
  startIdx: number,
  endIdx: number,
  grid: Uint8Array,
  width: number,
  height: number,
): number[] | null {
  const queue: number[] = [startIdx];
  const visited = new Uint8Array(width * height);
  const parents = new Int32Array(width * height).fill(-1);

  visited[startIdx] = 1;

  let head = 0;

  while (head < queue.length) {
    const currentIdx = queue[head++];

    if (currentIdx === endIdx) {
      return reconstructPath(endIdx, parents, grid);
    }

    const cx = currentIdx % width;
    const cy = (currentIdx / width) | 0;

    for (let i = 0; i < DIRECTIONS.length; i++) {
      const [dx, dy] = DIRECTIONS[i];
      const nx = cx + dx;
      const ny = cy + dy;

      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const nIdx = ny * width + nx;

        if (
          visited[nIdx] === 0 &&
          (grid[nIdx] === GRID_CELL.EMPTY || grid[nIdx] === GRID_CELL.TARGET)
        ) {
          visited[nIdx] = 1;
          parents[nIdx] = currentIdx;
          queue.push(nIdx);
        }
      }
    }
  }
  return null;
}

function reconstructPath(
  endIdx: number,
  parents: Int32Array,
  grid: Uint8Array,
): number[] {
  const path: number[] = [];
  let temp = endIdx;

  while (temp !== -1) {
    if (grid[temp] === GRID_CELL.EMPTY) {
      grid[temp] = GRID_CELL.PATH;
    }
    path.push(temp);
    temp = parents[temp];
  }

  return path.reverse();
}
