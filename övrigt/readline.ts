import * as readline from 'readline'

class Player {
    player: string;
    color: string;
    rl: readline.Interface;

    constructor(){
        this.player = ""
        this.color = ""
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
          });
    }

        choosePlayer = () =>  {return new Promise<void>((resolve, reject) => {
        this.rl.question("Välj en spelare: ", (player) => {
            this.player= player
          console.log(`Du valde : ${this.player}`)
          resolve()
        })
      })
       
    }

    chooseColor = () =>  {return new Promise<void>((resolve, reject) => {
        this.rl.question("Välj en färg: ", (color) => {
            this.color = color
          console.log(`Du valde: ${this.color}`)
          resolve()
        })
      })
       
    }

        
     main = async () => {
        await this.choosePlayer();
        await this.chooseColor();
        this.rl.close()
      }
   
}

let nySpelare = new Player()
nySpelare.main();


