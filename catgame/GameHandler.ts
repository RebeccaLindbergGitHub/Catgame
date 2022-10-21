import * as readline from "readline";
import { User } from "./Items/User";
import { Grid } from "./Grid";
import { ItemHandler } from "./ItemHandler";

export class GameHandler {
  rl: readline.Interface;
  seconds: number;
  board: Grid;
  points: number;
  startSymbol: string;
  itemHandler: ItemHandler;
  interval: NodeJS.Timer;
  UserOnFire: boolean;

  constructor(height: number, width: number, symbol: string) {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    this.seconds = 41;
    this.board = new Grid(height, width);
    this.points = 0;
    this.startSymbol = "🎄";
    this.itemHandler = new ItemHandler(
      height,
      width,
      new User(height / 2, width / 2, symbol),
      10,
      5
    );
    this.interval = this.startTimer();
    this.UserOnFire = false;
  }
  startTimer() {
    this.interval = setInterval(() => {
      this.seconds--;
      this.logUi();
      if (this.seconds < 1) {
        clearInterval(this.interval);
        console.log("Tiden är ute!");
        this.rl.close();
      }
    }, 1000);
    return this.interval;
  }

  checkIfTerminateGame(): void {
    if (this.UserOnFire) {
      console.log("Game Over 😿");
      clearInterval(this.interval);
      this.rl.close();
    }
  }

  checkIfVictory() {
    if (this.itemHandler.checkIfVictory()) {
      console.log("Du har vunnit!😻");
      clearInterval(this.interval);
      this.rl.close();
    }
  }

  startGame() {
    this.initGrid();
    this.onMove();
  }

  initGrid() {
    this.itemHandler.items.forEach((ball) => {
      this.board.grid[ball.yPos][ball.xPos] = ball.symbol;
    });
    this.board.grid[this.itemHandler.user.yPos][this.itemHandler.user.xPos] =
      this.startSymbol;
  }

  onMove() {
    readline.emitKeypressEvents(process.stdin);
    process.stdin.on("keypress", (chunk, key) => {
      this.board.grid[this.itemHandler.user.yPos][this.itemHandler.user.xPos] =
        "  ";

      if (key.name === "right") {
        this.itemHandler.user.xPos = this.getNewPosition(
          this.itemHandler.user.xPos + 1,
          this.board.width
        );
      } else if (key.name === "left") {
        this.itemHandler.user.xPos = this.getNewPosition(
          this.itemHandler.user.xPos - 1,
          this.board.width
        );
      } else if (key.name === "up") {
        this.itemHandler.user.yPos = this.getNewPosition(
          this.itemHandler.user.yPos - 1,
          this.board.height
        );
      } else if (key.name === "down") {
        this.itemHandler.user.yPos = this.getNewPosition(
          this.itemHandler.user.yPos + 1,
          this.board.height
        );
      }
      let itemData = this.itemHandler.getItemDataFromPos(
        this.itemHandler.user.yPos,
        this.itemHandler.user.xPos
      );
      this.seconds += itemData.time;
      this.points += itemData.points;
      this.UserOnFire = itemData.isOnFire;

      if (itemData.randomItem != undefined) {
        this.board.grid[itemData.randomItem.yPos][itemData.randomItem.xPos] =
          itemData.randomItem.symbol;
      }

      this.board.grid[this.itemHandler.user.yPos][this.itemHandler.user.xPos] =
        this.itemHandler.user.symbol;

      this.logUi();
      this.checkIfTerminateGame();
      this.checkIfVictory();
    });
  }

  getNewPosition(position: number, edge: number): number {
    if (position === edge) {
      return 0;
    } else if (position === -1) {
      return edge - 1;
    } else return position;
  }

  logUi() {
    console.clear();
    console.log("Sekunder kvar: " + this.seconds);
    console.log("Poäng: " + this.points);
    console.log(this.printGrid());
  }

  printGrid(): string {
    let plats: string = "";
    for (let y = 0; y < this.board.height; y++) {
      for (let x = 0; x < this.board.width; x++) {
        plats += this.board.grid[y][x];
      }
      plats += "\r\n";
    }
    return plats;
  }
}

new GameHandler(20, 40, "😼").startGame();
