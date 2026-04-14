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
  GRASS: 1,
  SAND: 5,
  WATER: 10,
} as const;

export const CELL_COLORS: Record<number, string | null> = {
  [GRID_CELL.EMPTY]: null, // null means the cell is transparent
  [GRID_CELL.WALL]: "#333",
  [GRID_CELL.START]: "#2ECC71",
  [GRID_CELL.TARGET]: "#E74C3C",
  [GRID_CELL.PATH]: "#F1C40F",
};

/**
 * Standard 4-directional movement (Up, Down, Left, Right).
 */
export const DIRECTIONS = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
] as const;
