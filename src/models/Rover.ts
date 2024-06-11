import {Direction} from "./Direction";

class Rover {
  x: number;
  y: number;
  direction: Direction;

  constructor(x:number, y:number, direction:Direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;
  }

  toString(){
    return `[${this.x} ${this.y} ${this.direction}]`;
  }
}

export default Rover;