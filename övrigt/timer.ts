export class Timer {
  seconds: number;

  constructor( seconds: number ){
      this.seconds = seconds
      
  }

  startCountDown(){
      let counter = this.seconds;
  
  const interval = setInterval(() => {
      console.clear();
      console.log('Du har : ' + counter + ' sekunder kvar');
    counter--;
   
  
    if (counter < 0 ) {
      clearInterval(interval);
      console.log('Game over!');
   }
  } , 1000);
 
  }
}
// let test = new Timer(10);
// test.startCountDown();
