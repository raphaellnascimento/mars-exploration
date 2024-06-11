import Plateau from "../models/Plateau";

export default class PlateauService {    
  
  static isCoordsValid(plateau:Plateau, x:number, y:number):boolean {
    return x >= 0 && x <= plateau.width && y >= 0 && y <= plateau.height;
  }
    
}