// koordinatsystemet roteras 90 grader, har därför bytt plats på height och width


import * as readline from 'readline';

('use strict');

class Catgame {
    height: number;
    width: number;
    catgameLayout: Function;
    grid: string[][];
    rl: readline.Interface;
    xPos: number;
    yPos: number;
    itemCountRed: number;
    itemCountGreen: number;
   
    
    
    
    constructor(height: number, width: number, xPos: number, yPos: number) {
        this.height = height
        this.width = width
        this.catgameLayout = () => {}
        this.grid = []
        this.rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout,
        });
        this.xPos = xPos
        this.yPos = yPos
        this.itemCountRed = 0
        this.itemCountGreen = 0
        
      
    }

    
    startGame() {
      this.grid = this.setGrid();
      this.setMarker();
      this.placeItems(); 
      this.readMove();
      this.printGrid();
    }
    

    setGrid() {
      let grid: string[][] = [];
        for( let i = 0; i < this.width; i++) {
          grid[i] = []
          for(let j = 0; j< this.height; j++){
            grid[i][j]= '__'
          }
        }
        return grid;
    }

    setMarker() {
        this.grid[this.yPos][this.xPos] = "🎄"
        return this.grid;
        
    }

    setItems() {
      let x = Math.floor(Math.random() * this.width)
      let y = Math.floor(Math.random() * this.height)
      if(this.grid[x][y] != '__') {
        this.setItems()
      } if(Math.random()*2> 1){
      this.grid[x][y] = '🔴' } else this.grid[x][y] = '🟢'

    }

    placeItems() {
      for(let i = 0; i < 10; i++) {
        this.setItems();
      }
     
    }

    
    
    readMove() {
        readline.emitKeypressEvents(process.stdin);
        process.stdin.on("keypress", (chunk, key) => {
            this.clearPreviousPositions();
            
            if (key.name === "right") {
                this.xPos = this.xPos + 1; 
                this.validateXPositions()
                
                
            } else if (key.name === "left") {
                this.validateXPositions()
                this.xPos = this.xPos - 1;
                
            } else if (key.name === "up") {
                this.validateYPositions();
                this.yPos = this.yPos - 1;
                
            } else if (key.name === "down") {
                this.yPos = this.yPos + 1;
                this.validateYPositions(); 
            }
            this.itemCounterRed();
            this.itemCounterGreen();
            this.updatePosition();
            this.printGrid();
            
        });
    }
    
    clearPreviousPositions () {
        this.grid[this.yPos][this.xPos] = "__";
        
    }
    validateXPositions() {
        if(this.xPos === this.height) {
            this.xPos = 0 
        } else if (this.xPos === 0) {
            this.xPos = this.height
            
        }
    }
    validateYPositions() {
        if (this.yPos === 0) {
            this.yPos = this.width
        } else if (this.yPos === this.width) {
            this.yPos = 0
        }
    }
    
    itemCounterRed(){  
      if(this.grid[this.yPos][this.xPos] === '🔴' ) {
        return this.itemCountRed += 1
      }
    }

    itemCounterGreen(){
        if(this.grid[this.yPos][this.xPos] === '🟢' ){
            return this.itemCountGreen += 1 
        }
    }

    addItem(){
        if(this.grid[this.yPos][this.xPos] === '🔴' || this.grid[this.yPos][this.xPos] === '🟢' ) {
            if(Math.random()*10 > 4){
                this.setItems();
                }
          }
    }

     updatePosition(){
      this.grid[this.yPos][this.xPos] = '😼';
      console.log(" Din position är x: " + this.xPos + " och y: " + this.yPos );

    }

    compareWithEmptyGrid(){
       let emptyGrid: string[][] =[]
        for(let i = 0; i < this.width; i++) {
            emptyGrid[i] = []
            for(let j = 0; j< this.height; j++){
              emptyGrid[i][j]= '__'
              emptyGrid[0][0]= '😼'
            }
          }
        if (this.grid === emptyGrid){ //(JSON.stringify(this.grid) === JSON.stringify(this.grid)
            console.log('Game over')
        }
    }


    printGrid() {

      console.clear();
 
      console.log(" Din position är x: " + this.xPos + " och y: " + this.yPos );

        console.log('Du har plockat ' + this.itemCountRed + ' röda och '+ this.itemCountGreen+  ' gröna julgranskulor!');
        console.log('Du har : ' + (this.itemCountRed + this.itemCountGreen*2) + ' poäng')

      let plats : string = "";
       for( let i = 0; i < this.width; i++) {
        
          for(let j =0; j< this.height; j++){
            plats += this.grid[i][j]
          }
          plats += '\r\n'
        }
        console.log(plats);
        this.compareWithEmptyGrid();
        return plats;

    }
   

  }

//START
let theGame = new Catgame(20, 10, 3, 3,);
theGame.startGame();