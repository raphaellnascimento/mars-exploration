import PlateauService from '../services/PlateauService';
import Rover from '../models/Rover';
import Plateau from '../models/Plateau';
import InvalidCommandError from '../exceptions/InvalidCommandError';
import {Direction} from "../models/Direction";
import {Command} from "../models/Command";

export default class RoverService {    
  plateau: Plateau;
  directions: Direction[];

  constructor(plateau: Plateau) {
    this.plateau = plateau;
    this.directions = [Direction.North, Direction.East, Direction.South, Direction.West];
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
      case Direction.North:
        newY += 1;
        break;
      case Direction.East:
        newX += 1;
        break;
      case Direction.South:
        newY -= 1;
        break;
      case Direction.West:
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

  executeCommands(rover:Rover, commands: Command[]):void {
    for (const command of commands) {
      switch (command) {
        case Command.Left:
          this.turnLeft(rover);
          break;
        case Command.Right:
          this.turnRight(rover);
          break;
        case  Command.Move:
          this.move(rover);
          break;        
      }
    }
  }
}