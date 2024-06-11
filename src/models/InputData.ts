import Plateau from "./Plateau";
import Rover from "./Rover";

class InputData {
    plateau: Plateau;
    rovers: Rover[];
    commands: Map<Rover,string>;
  
    constructor(plateau:Plateau, rovers:Rover[], commands:Map<Rover,string>) {
      this.plateau = plateau;
      this.rovers = rovers;
      this.commands = commands;
    }
  }
  
  export default InputData;
  