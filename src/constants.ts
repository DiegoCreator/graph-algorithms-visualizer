/**
 * Enum representing possible states of a grid cell.
 * Using 'as const' for literal types and better performance.
 */

export const GRID_CELL = {
  EMPTY: 0,
  WALL: 1,
  START: 2,
  TARGET: 3,
  PATH: 4,
} as const;

export const CELL_COLORS: Record<number, string | null> = {
  [GRID_CELL.EMPTY]: null,
  [GRID_CELL.WALL]: "#333",
  [GRID_CELL.START]: "#2ECC71",
  [GRID_CELL.TARGET]: "#E74C3C",
  [GRID_CELL.PATH]: "#F1C40F",
};
