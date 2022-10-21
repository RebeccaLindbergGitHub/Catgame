import * as readline from 'readline';

('use strict');

class Catgame {
    height : Number ;
     width : Number ;
    constructor(width: Number, height: Number) {
        this.height = height
        this.width = width

    }
   

     drawGrid = () => {
        let row: Array<string> = [];
        for( let i = 0; i < this.width; i++) {
           row[i] = ' '
           
           
        }
        console.log(row);
      };
      
      drawGrid2 = () => {
        let row: string[][] = [];
        for( let i = 0; i < this.width; i++) {
          row[i] = []
          for(let j =0; j< this.height; j++){
            row[i][j]= '_'
          }
          
        }
        
       let plats : string = "";
       for( let i = 0; i < this.width; i++) {
        
          for(let j =0; j< this.height; j++){
            plats += row[i][j]
          }
          plats += '\r\n'
        }
        console.log(plats);
      };
      

      gridLayout() {
        this.drawGrid2(); 

        
      }
      
}

let hej = new Catgame(10,10);
hej.drawGrid2();
