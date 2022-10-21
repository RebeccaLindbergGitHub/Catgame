

function compareWithEmptyGrid(){
    let emptyGrid: string[][] =[]
     for(let i = 0; i < 10; i++) {
         emptyGrid[i] = []
         for(let j = 0; j< 10; j++){
           emptyGrid[i][j]= '__'
            
         }
       }
       let emptyGrid1: string[][] =[]
     for(let i = 0; i < 10; i++) {
         emptyGrid1[i] = []
         for(let j = 0; j< 10; j++){
           emptyGrid1[i][j]= '__'
           emptyGrid1[0][0] = '😼'
             
         }
       }
    console.log(emptyGrid1)
     if (JSON.stringify(emptyGrid) === JSON.stringify(emptyGrid1)){
         console.log('Game over') 
     } 
 }

 compareWithEmptyGrid();