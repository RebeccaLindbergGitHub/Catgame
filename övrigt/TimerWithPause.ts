import * as readline from "readline";

class Game {
  rl: readline.Interface;
  seconds: number;
  interval: NodeJS.Timer;

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    this.seconds = 11;
    this.interval = this.timer()
  }

  timer() {
    this.interval = setInterval(() => {
    this.seconds--;
    console.log(this.seconds)
    this.pauseTimer()
    if(this.seconds < 1){
        clearInterval(this.interval) 
        console.log("Tiden är ute!")
    }
}, 1000);
return this.interval;
}



  pauseTimer() {
    if (this.seconds === 5) {
        console.log("Game Over");
        clearInterval(this.interval) 
        this.rl.close();
    }
  }

}

let hej = new Game();
hej
