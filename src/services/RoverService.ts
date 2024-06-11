import PlateauService from '../services/PlateauService';
import Rover from '../models/Rover';
import Plateau from '../models/Plateau';
import InvalidCommandError from '../exceptions/InvalidCommandError';

export default class RoverService {    
  plateau: Plateau;
  directions: string[];

  constructor(plateau: Plateau) {
    this.plateau = plateau;
    this.directions = ['N', 'E', 'S', 'W'];
  }

  turnLeft(rover:Rover):void {
    const currentIdx = this.directions.indexOf(rover.direction);
    rover.direction = this.directions[(currentIdx + 3) % 4];
  }

  turnRight(rover:Rover):void {
    const currentIdx = this.directions.indexOf(rover.direction);
    rover.direction = this.directions[(currentIdx + 1) % 4];
  }

  move(rover:Rover):void {
    let newX:number = rover.x;
    let newY:number = rover.y;
    
    switch (rover.direction) {
      case 'N':
        newY += 1;
        break;
      case 'E':
        newX += 1;
        break;
      case 'S':
        newY -= 1;
        break;
      case 'W':
        newX -= 1;
        break;
    }

    if (PlateauService.isCoordsValid(this.plateau, newX, newY)) {
      rover.x = newX;
      rover.y = newY;
    } else {
      throw new InvalidCommandError(`Rover ${rover} is trying to move out of the plateau bounds!`);
    }
  }

  executeCommands(rover:Rover, commands: string):void {
    for (const command of commands) {
      switch (command) {
        case 'L':
          this.turnLeft(rover);
          break;
        case 'R':
          this.turnRight(rover);
          break;
        case 'M':
          this.move(rover);
          break;        
      }
    }
  }
}