import { Item } from "./Item";

export class Gift extends Item {
  time: number;

  constructor(yPos: number, xPos: number) {
    super(yPos, xPos, '🎁');
    this.time = 5;
  }
}
