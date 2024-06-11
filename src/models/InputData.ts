import Plateau from "./Plateau";
import Rover from "./Rover";
import {Command} from "./Command";

class InputData {
    plateau: Plateau;
    rovers: Rover[];
    commands: Map<Rover,Command[]>;
  
    constructor(plateau:Plateau, rovers:Rover[], commands:Map<Rover,Command[]>) {
      this.plateau = plateau;
      this.rovers = rovers;
      this.commands = commands;
    }
  }
  
  export default InputData;
  