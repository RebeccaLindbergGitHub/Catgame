import * as readline from 'readline';

("use strict");

class TicTacToe {
  yPos: number;
    items: string[][];
    xPos: number;
    ticTacToeLayout: string;
    rl: readline.Interface;
    
  constructor() {
    // initiate variables
    this.items = [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "],
    ];
    this.xPos = 0;
    this.yPos = 0;
    this.ticTacToeLayout = "";
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  /// update layout
  updateLayout() {
    this.ticTacToeLayout = `${this.items[0][0]} | ${this.items[0][1]} | ${this.items[0][2]}
---------
${this.items[1][0]} | ${this.items[1][1]} | ${this.items[1][2]}
---------
${this.items[2][0]} | ${this.items[2][1]} | ${this.items[2][2]}`;
  }

  displayLayout() {
    this.updateLayout();
    console.clear();
    console.log(this.ticTacToeLayout);
    console.log(`xPos is: ${this.xPos} and yPos is: ${this.yPos}`);
  }

  // start game
  startGame() {
    this.displayLayout();
    this.readMove();

    if (this.xPos > 3 || this.yPos > 3) {
      this.endGame();
    }
  }

  readMove() {
    readline.emitKeypressEvents(process.stdin);
    process.stdin.on("keypress", (chunk, key) => {
      //console.log("keyname", key.name);
      if (key.name === "right") {
        this.xPos = this.xPos + 1;
      } else if (key.name === "left") {
        this.xPos = this.xPos - 1;
      } else if (key.name === "up") {
        this.yPos = this.yPos - 1;
      } else if (key.name === "down") {
        this.yPos = this.yPos + 1;
      }

    

      this.updatePosition();
      this.displayLayout();
    });
  }

  updatePosition() {
    this.clearPreviousPositions();
    this.items[this.yPos][this.xPos] = ">";
  }

  clearPreviousPositions() {
    this.items = [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "],
    ];
  }

  endGame() {
    this.rl.close();
    process.exit();
    return false;
  }
}

var game = new TicTacToe();

game.startGame();