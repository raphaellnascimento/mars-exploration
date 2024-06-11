import InputParser from "../src/utils/InputParser";
import { assert, expect } from "chai";
import { Direction } from "../src/models/Direction";
import { Command } from "../src/models/Command";
import { deepEqual } from "assert";
describe('InputParser', () => {
    it('should correctly parse the plateau dimensions and rover data', () => {
        const input = `5 5
      1 2 N
      LMLR
      3 3 E
      MRRRL
    `;
        const roverData = [
            { x: 1, y: 2, direction: Direction.North, commands: [Command.Left, Command.Move, Command.Left, Command.Right] },
            { x: 3, y: 3, direction: Direction.East, commands: [Command.Move, Command.Right, Command.Right, Command.Right, Command.Left] }
        ];
        const result = InputParser.parseInput(input);
        assert(5 === result.plateau.width);
        assert(5 === result.plateau.height);
        assert(2 === result.rovers.length);
        for (let i = 0; i < roverData.length; i++) {
            assert(roverData[i].x === result.rovers[i].x);
            assert(roverData[i].y === result.rovers[i].y);
            assert(roverData[i].direction === result.rovers[i].direction);
            deepEqual(roverData[i].commands, result.commands.get(result.rovers[i]));
        }
    });
    it('should throw an error if the plateau width is incorrect', () => {
        const input = `
      A 5    
    `;
        expect(() => InputParser.parseInput(input)).to.throw('Plateau width must be a valid and positive number');
    });
    it('should throw an error if the plateau height is incorrect', () => {
        const input = `
      5 A    
    `;
        expect(() => InputParser.parseInput(input)).to.throw('Plateau height must be a valid and positive number');
    });
    it('should throw an error if the input is blank', () => {
        const input = '';
        expect(() => InputParser.parseInput(input)).to.throw('Invalid input data');
    });
    it('should throw an error if receive an invalid landing x position', () => {
        const input = `
      5 5
      a 2 N          
    `;
        expect(() => InputParser.parseInput(input)).to.throw('Landing x must be a valid and positive number');
    });
    it('should throw an error if receive an invalid landing y position', () => {
        const input = `
      5 5
      1 X N          
    `;
        expect(() => InputParser.parseInput(input)).to.throw('Landing y must be a valid and positive number');
    });
    it('should throw an error if receive an invalid landing direction', () => {
        const input = `
      5 5
      1 5 B          
    `;
        expect(() => InputParser.parseInput(input)).to.throw('Invalid landing direction: B');
    });
    it('should throw an error if receive an invalid command', () => {
        const input = `
      5 5
      1 2 N
      LMLMLMLMMB       
    `;
        expect(() => InputParser.parseInput(input)).to.throw('Invalid command: B for rover [1 2 N]');
    });
    it('should throw an error if receive an blank command', () => {
        const input = `
      5 5
      1 2 N

    `;
        expect(() => InputParser.parseInput(input)).to.throw('Rover [1 2 N] should receive a command string');
    });
    it('should thrown an error if the first line not follows the input spec', () => {
        const input = `
      5
      1 2 N
      LMLMLMLMM
    `;
        expect(() => InputParser.parseInput(input)).to.throw('Plateau dimension must have two values separated by space');
    });
});
