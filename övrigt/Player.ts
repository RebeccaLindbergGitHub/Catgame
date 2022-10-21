import * as readline from "readline";

export class Player{
    rl: readline.Interface;
    player: string;
    constructor(){
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
          });
        this.player = ""
           
    }

    chooseSymbol = () =>  {return new Promise<void>((resolve, reject) => {
        this.rl.question("Välj en spelare: ", (player) => {
            resolve()
            this.player = player;
          console.log(`Du valde : ${this.player}`)
        })
      })
       
    }
main = async () => {
    await this.chooseSymbol();
    await this.rl.close()
      }
}
