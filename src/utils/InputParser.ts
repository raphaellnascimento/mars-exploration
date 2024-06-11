import InputData from "../models/InputData";
import Plateau from "../models/Plateau";
import Rover from "../models/Rover";
import InvalidInputError from "../exceptions/InvalidInputError";
import InvalidCommandError from "../exceptions/InvalidCommandError";
import {Direction, toDirection} from "../models/Direction";
import {Command, toCommand} from "../models/Command";

export default class InputParser {
    
    static parseInput(input:string):InputData {
      if (!input) {
        throw new InvalidInputError('Invalid Instructions data')
      }
      const lines = input.trim().split('\n');
      const plateau = this.getPlateauDimension(lines[0]);
      const rovers:Rover[]= [];
      const commands:Map<Rover, Command[]> = new Map<Rover, Command[]>();

      for (let i = 1; i < lines.length; i += 2) {
        const rover = this.getRover(lines[i]);
        const roverCommands = this.getCommands(rover, lines[i + 1]);
        rovers.push(rover);
        commands.set(rover, roverCommands);
      }
  
      return new InputData(plateau, rovers, commands);
    }

    static getPlateauDimension(line:string):Plateau {
      const plateauDimension = line.trim().split(' ');

      if (plateauDimension.length !== 2) {
        throw new InvalidInputError('Plateau dimension must have two values separated by space');
      }

      const [plateauWidth, plateauHeight] = plateauDimension.map(Number);
      if (!Number.isInteger(plateauWidth) || plateauWidth < 0) {
        throw new InvalidInputError('Plateau width must be a valid and positive number')
      }

      if (!Number.isInteger(plateauHeight) || plateauHeight < 0) {
        throw new InvalidInputError('Plateau height must be a valid and positive number')
      }

      return new Plateau(plateauWidth, plateauHeight);
    }

    static getRover(input:string):Rover {
      if(!input) {
        throw new InvalidCommandError('Should receive a rover string')
      }

      const landingPosition:string[]  = input.trim().split(' ');
      const x:number = Number(landingPosition[0]);
      const y:number = Number(landingPosition[1]);
      const strDirection:string = landingPosition[2];


      if (!Number.isInteger(x) || x < 0) {
        throw new InvalidInputError('Landing x must be a valid and positive number')
      }

      if (!Number.isInteger(y) || y < 0) {
        throw new InvalidInputError('Landing y must be a valid and positive number')
      }

      const direction:Direction | undefined = toDirection(strDirection);
      if (!direction) {
        throw new InvalidInputError(`Invalid landing direction: ${strDirection}`)
      }

      return new Rover(x, y, direction);
    }

    static getCommands(rover:Rover, input:string):Command[] {
      if(!input) {
        throw new InvalidCommandError(`Rover ${rover} should receive a command string`)
      }

      const commands:Command[] = [];
      for (const strCommand of input.trim()) {
        const command = toCommand(strCommand);
        if (!command) {
          throw new InvalidCommandError(`Invalid command: ${strCommand} for rover ${rover}`)
        }
        commands.push(command);
      }
      return commands;
    }
  }