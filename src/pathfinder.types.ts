export type PathfindingFn = (
  startIdx: number,
  endIdx: number,
  grid: Uint8Array,
  width: number,
  height: number,
) => number[] | null;
