const width = 50;
const height = 50;

export function findPathTyped(
  startIdx: number,
  endIdx: number,
  grid: Uint8Array,
) {
  const queue: number[] = [startIdx];
  const visited = new Uint8Array(width * height);
  const parents = new Int32Array(width * height).fill(-1);

  visited[startIdx] = 1;

  let head = 0;

  while (head < queue.length) {
    const currentIdx = queue[head++];

    if (currentIdx === endIdx) {
      const path: number[] = [];
      let temp = endIdx;

      while (temp !== -1) {
        if (grid[temp] === 0) {
          grid[temp] = 4;
        }
        path.push(temp);
        temp = parents[temp];
      }

      return path.reverse();
    }

    const cx = currentIdx % width;
    const cy = Math.floor(currentIdx / width);

    for (const [dx, dy] of [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ] as const) {
      const nx = cx + dx;
      const ny = cy + dy;
      const nIdx = ny * width + nx;

      if (
        nx >= 0 &&
        nx < width &&
        ny >= 0 &&
        ny < height &&
        (grid[nIdx] === 0 || grid[nIdx] === 3) &&
        visited[nIdx] === 0
      ) {
        visited[nIdx] = 1;
        parents[nIdx] = currentIdx;
        queue.push(nIdx);
      }
    }
  }
  return null;
}
