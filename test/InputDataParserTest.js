import InputParser from "../src/utils/InputParser";
import { expect } from 'chai';
describe('InputParser', () => {
    it('should correctly parse the plateau dimensions and rover data', () => {
        const input = `5 5
      1 2 N
      LMLMLMLMM
      3 3 E
      MRRMMRMRRM
    `;
        const expectedOutput = {
            plateauWidth: 5,
            plateauHeight: 5,
            roverData: [
                { x: 1, y: 2, direction: 'N', commands: 'LMLMLMLMM' },
                { x: 3, y: 3, direction: 'E', commands: 'MRRMMRMRRM' }
            ]
        };
        const result = InputParser.parseInput(input);
        expect(result).to.deep.equal(expectedOutput);
    });
    it('should throw an error if the plateau width is incorrect', () => {
        const input = `
      A 5    
    `;
        expect(() => InputParser.parseInput(input)).to.throw('Plateau width must be an integer number');
    });
    it('should throw an error if the plateau height is incorrect', () => {
        const input = `
      5 A    
    `;
        expect(() => InputParser.parseInput(input)).to.throw('Plateau height must be an integer number');
    });
    it('should throw an error if the plateau width is incorrect', () => {
        const input = `
          
    `;
        expect(() => InputParser.parseInput(input)).to.throw('Plateau height must be an integer number');
    });
    it('should throw an error if receive an invalid landing x position', () => {
        const input = `
      5 5
      a 2 N          
    `;
        expect(() => InputParser.parseInput(input)).to.throw('Landing x must be an integer number');
    });
    it('should throw an error if receive an invalid landing y position', () => {
        const input = `
      5 5
      1 X N          
    `;
        expect(() => InputParser.parseInput(input)).to.throw('Landing y must be an integer number');
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
        expect(() => InputParser.parseInput(input)).to.throw('Invalid command: B');
    });
});
