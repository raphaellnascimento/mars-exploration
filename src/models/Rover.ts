class Rover {
  x: number;
  y: number;
  direction: string;

  constructor(x:number, y:number, direction:string) {
    this.x = x;
    this.y = y;
    this.direction = direction;
  }

  toString(){
    return `[${this.x} ${this.y} ${this.direction}]`;
  }
}

export default Rover;