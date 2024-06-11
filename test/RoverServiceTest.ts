import {expect} from 'chai';
import Plateau from "../src/models/Plateau";
import Rover from "../src/models/Rover";
import RoverService from "../src/services/RoverService";
import InvalidCommandError from "../src/exceptions/InvalidCommandError";
import {Direction} from "../src/models/Direction";
import {Command} from "../src/models/Command";

describe('RoverService', () => {
    let plateau: Plateau;
    let rover: Rover;
    let roverService: RoverService;

    beforeEach(() => {
        plateau = new Plateau(5, 5);
        rover = new Rover(1, 2, Direction.North);
        roverService = new RoverService(plateau);
    });

    it('should turn left correctly', () => {
        // N -> W -> S -> E -> N
        roverService.turnLeft(rover);
        expect(rover.direction).to.equal(Direction.West);
        roverService.turnLeft(rover);
        expect(rover.direction).to.equal(Direction.South);
        roverService.turnLeft(rover);
        expect(rover.direction).to.equal(Direction.East);
        roverService.turnLeft(rover);
        expect(rover.direction).to.equal(Direction.North);
    });

    it('should turn right correctly', () => {
        // N -> E -> S -> W -> N
        roverService.turnRight(rover);
        expect(rover.direction).to.equal(Direction.East);
        roverService.turnRight(rover);
        expect(rover.direction).to.equal(Direction.South);
        roverService.turnRight(rover);
        expect(rover.direction).to.equal(Direction.West);
        roverService.turnRight(rover);
        expect(rover.direction).to.equal(Direction.North);
    });

    it('should move correctly within plateau bounds', () => {
        roverService.move(rover);
        expect(rover.x).to.equal(1);
        expect(rover.y).to.equal(3);
        expect(rover.direction).to.equal(Direction.North);

        rover.direction = Direction.East;
        roverService.move(rover);
        expect(rover.x).to.equal(2);
        expect(rover.y).to.equal(3);
        expect(rover.direction).to.equal(Direction.East);

        rover.direction = Direction.South;
        roverService.move(rover);
        expect(rover.x).to.equal(2);
        expect(rover.y).to.equal(2);
        expect(rover.direction).to.equal(Direction.South);

        rover.direction = Direction.West;
        roverService.move(rover);
        expect(rover.x).to.equal(1);
        expect(rover.y).to.equal(2);
        expect(rover.direction).to.equal(Direction.West);
    });

    it('should throw error when moving out of plateau bounds', () => {
        rover.direction = Direction.North;
        rover.y = 5;
        expect(() => roverService.move(rover)).to.throw(InvalidCommandError, 'Rover [1 5 N] is trying to move out of the plateau bounds!');

        rover.direction = Direction.East;
        rover.x = 5;
        expect(() => roverService.move(rover)).to.throw(InvalidCommandError, 'Rover [5 5 E] is trying to move out of the plateau bounds!');

        rover.direction = Direction.South;
        rover.y = 0;
        expect(() => roverService.move(rover)).to.throw(InvalidCommandError, 'Rover [5 0 S] is trying to move out of the plateau bounds!');

        rover.direction = Direction.West;
        rover.x = 0;
        expect(() => roverService.move(rover)).to.throw(InvalidCommandError, 'Rover [0 0 W] is trying to move out of the plateau bounds!');
    });

    it('should execute commands correctly', () => {
        roverService.executeCommands(rover, [Command.Left, Command.Move,Command.Left, Command.Move,
            Command.Left, Command.Move, Command.Left, Command.Move, Command.Move]);

        expect(rover.toString()).to.equal('[1 3 N]');

        rover = new Rover(3, 3, Direction.East);
        roverService.executeCommands(rover, [Command.Move, Command.Right, Command.Right, Command.Move, Command.Move, Command.Right, Command.Move, Command.Right, Command.Right, Command.Move]);
        expect(rover.toString()).to.equal('[2 3 S]');
    });
});
