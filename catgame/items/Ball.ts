import { Item } from "./Item";

export class Ball extends Item {
  points: number;

  constructor(yPos: number, xPos: number, symbol: string, points: number) {
    super(yPos, xPos, symbol);
    this.points = points;
  }
}

export class RedBall extends Ball {
  constructor(yPos: number, xPos: number) {
    super(yPos, xPos, "🔴", 1);
  }
}

export class GreenBall extends Ball {
  constructor(yPos: number, xPos: number) {
    super(yPos, xPos, "🟢", 2);
  }
}
