import { expect } from 'chai';
import Plateau from "../src/models/Plateau";
import Rover from "../src/models/Rover";
import RoverService from "../src/services/RoverService";
import InvalidCommandError from "../src/exceptions/InvalidCommandError";

describe('RoverService', () => {
    let plateau: Plateau;
    let rover: Rover;
    let roverService: RoverService;

    beforeEach(() => {
        plateau = new Plateau(5, 5);
        rover = new Rover(1, 2, 'N');
        roverService = new RoverService(plateau);
    });

    it('should turn left correctly', () => {
        // N -> W -> S -> E -> N
        roverService.turnLeft(rover);
        expect(rover.direction).to.equal('W');
        roverService.turnLeft(rover);
        expect(rover.direction).to.equal('S');
        roverService.turnLeft(rover);
        expect(rover.direction).to.equal('E');
        roverService.turnLeft(rover);
        expect(rover.direction).to.equal('N');
    });

    it('should turn right correctly', () => {
        // N -> E -> S -> W -> N
        roverService.turnRight(rover);
        expect(rover.direction).to.equal('E');
        roverService.turnRight(rover);
        expect(rover.direction).to.equal('S');
        roverService.turnRight(rover);
        expect(rover.direction).to.equal('W');
        roverService.turnRight(rover);
        expect(rover.direction).to.equal('N');
    });

    it('should move correctly within plateau bounds', () => {
        roverService.move(rover);
        expect(rover.x).to.equal(1);
        expect(rover.y).to.equal(3);
        expect(rover.direction).to.equal('N');

        rover.direction = 'E';
        roverService.move(rover);
        expect(rover.x).to.equal(2);
        expect(rover.y).to.equal(3);
        expect(rover.direction).to.equal('E');

        rover.direction = 'S';
        roverService.move(rover);
        expect(rover.x).to.equal(2);
        expect(rover.y).to.equal(2);
        expect(rover.direction).to.equal('S');

        rover.direction = 'W';
        roverService.move(rover);
        expect(rover.x).to.equal(1);
        expect(rover.y).to.equal(2);
        expect(rover.direction).to.equal('W');
    });

    it('should throw error when moving out of plateau bounds', () => {
        rover.direction = 'N';
        rover.y = 5;
        expect(() => roverService.move(rover)).to.throw(InvalidCommandError, 'Rover [1 5 N] is trying to move out of the plateau bounds!');

        rover.direction = 'E';
        rover.x = 5;
        expect(() => roverService.move(rover)).to.throw(InvalidCommandError, 'Rover [5 5 E] is trying to move out of the plateau bounds!');

        rover.direction = 'S';
        rover.y = 0;
        expect(() => roverService.move(rover)).to.throw(InvalidCommandError, 'Rover [5 0 S] is trying to move out of the plateau bounds!');

        rover.direction = 'W';
        rover.x = 0;
        expect(() => roverService.move(rover)).to.throw(InvalidCommandError, 'Rover [0 0 W] is trying to move out of the plateau bounds!');
    });

    it('should execute commands correctly', () => {
        roverService.executeCommands(rover, 'LMLMLMLMM');
        expect(rover.toString()).to.equal('[1 3 N]');

        rover = new Rover(3, 3, 'E');
        roverService.executeCommands(rover, 'MRRMMRMRRM');
        expect(rover.toString()).to.equal('[2 3 S]');
    });
});
