import { Item } from "./Items/Item";

export class ItemData{
    points: number;
    time: number;
    isOnFire: boolean;
    randomItem : Item | undefined;


    constructor(points: number, time:number, isOnFire:boolean, randomItem: Item | undefined = undefined){
        this.points = points
        this.time = time
        this.isOnFire = isOnFire
        this.randomItem = randomItem
    }
}