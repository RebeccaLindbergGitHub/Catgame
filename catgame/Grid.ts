
export class Grid {
  height: number;
  width: number;
  grid: string[][];

  constructor(height: number, width: number) {
    this.height = height;
    this.width = width;
    this.grid = this.initGrid();
  }

   private initGrid() {
    let grid: string[][] = [];
    for (let y = 0; y < this.height; y++) {
      grid[y] = [];
      for (let x = 0; x < this.width; x++) {
        grid[y][x] = "  ";
      }
    }
    return grid;
  }
}
