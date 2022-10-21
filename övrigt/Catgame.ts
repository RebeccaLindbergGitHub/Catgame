// koordinatsystemet roteras 90 grader, har därför bytt plats på height och width

import * as readline from "readline";

("use strict");

class Catgame {
  height: number;
  width: number;
  catgameLayout: Function;
  grid: string[][];
  rl: readline.Interface;
  xPos: number;
  yPos: number;
  ornamentCount: number;

  constructor(height: number, width: number, xPos: number, yPos: number) {
    this.height = height;
    this.width = width;
    this.catgameLayout = () => {};
    this.grid = [];
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    this.xPos = xPos;
    this.yPos = yPos;
    this.ornamentCount = 0;
  }

  startGame() {
    this.grid = this.setGrid();
    this.setMarker();
    this.placeOrnaments();
    this.readMove();
    this.printGrid();
  }

  setGrid() {
    let grid: string[][] = [];
    for (let i = 0; i < this.height; i++) {
      grid[i] = [];
      for (let j = 0; j < this.width; j++) {
        grid[i][j] = "__";
      }
    }
    return grid;
  }

  setMarker() {
    this.grid[this.yPos][this.xPos] = "🎄";
    return this.grid;
  }

  placeOrnaments() {
    for (let i = 0; i < 5; i++) {
      this.setOrnament();
    }
  }

  setOrnament() {
    let x = Math.floor(Math.random() * this.width);
    let y = Math.floor(Math.random() * this.height);
    if (this.grid[x][y] != "__") {
      this.setOrnament();
    }
    console.log("x: " + y + " y: " + x);

    this.grid[x][y] = "aa";
  }

  // ornamentCounter(){
  //   let counter: number[] = [];
  //   if(this.grid[this.xPos][this.yPos] === "🔴") {
  //     counter.push(1)
  //   }
  //   console.log('Du har plockat ' + counter.length + ' julgranskulor!' )
  // }

  readMove() {
    readline.emitKeypressEvents(process.stdin);
    process.stdin.on("keypress", (chunk, key) => {
      console.log(this.xPos, this.yPos);
      this.grid[this.yPos][this.xPos] = "__";

      if (key.name === "right") {
        this.xPos = this.getNewPosition(this.xPos + 1, this.height);

      } else if (key.name === "left") {
        this.xPos = this.getNewPosition(this.xPos - 1, this.height);

      } else if (key.name === "up") {
        this.yPos = this.getNewPosition(this.yPos - 1, this.width);

      } else if (key.name === "down") {
        this.yPos = this.getNewPosition(this.yPos + 1, this.width);
      }

      if (this.grid[this.xPos][this.yPos] == "aa") {
        this.ornamentCount += 1;
      }

      this.updatePosition();
      this.printGrid();
    });
  }

  getNewPosition(position: number, edge: number): number {
    if (position === edge) {
      return 0;
    } else if (position === -1) {
      return edge;
    } else return position;
  }

  updatePosition() {
    this.grid[this.yPos][this.xPos] = "😻";
  }

  printGrid() {
    console.clear();

    console.log(" Din position är x: " + this.xPos + " och y: " + this.yPos);

    

    let plats: string = "";
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        plats += this.grid[i][j];
      }
      plats += "\r\n";
    }
    console.log(plats);
    return plats;
  }
}

//START
let hej = new Catgame(20, 10, 5, 5);
hej.startGame();
