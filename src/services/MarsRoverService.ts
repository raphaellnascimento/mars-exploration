import Plateau from "../models/Plateau";
import Rover from "../models/Rover";
import InputData from "../models/InputData";
import InputParser from "../utils/InputParser";
import RoverService from "./RoverService";
import {Command} from "../models/Command";

export default class MarsRoverService {
  plateau: Plateau;
  rovers: Rover[];
  commands: Map<Rover, Command[]>;

  constructor(input:String) {
    const inputData: InputData = InputParser.parseInput(input);
    this.plateau = inputData.plateau;
    this.rovers = inputData.rovers;
    this.commands = inputData.commands;
  }

  exploreMars():Rover[] {
    this.rovers.forEach((rover:Rover) => {
      const commands = this.commands.get(rover);
      if (commands) {
        const roverService = new RoverService(this.plateau);
        roverService.executeCommands(rover, commands);
      }
    });

    return this.rovers;
  }

}