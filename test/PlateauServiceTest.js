import { expect } from 'chai';
import PlateauService from '../src/services/PlateauService';
import Plateau from '../src/models/Plateau';
describe('PlateauService', () => {
    let plateau;
    beforeEach(() => {
        plateau = new Plateau(5, 5);
    });
    it('should return true for valid coordinates within the plateau', () => {
        expect(PlateauService.isCoordsValid(plateau, 3, 3)).to.be.true;
        expect(PlateauService.isCoordsValid(plateau, 0, 0)).to.be.true;
        expect(PlateauService.isCoordsValid(plateau, 5, 5)).to.be.true;
    });
    it('should return false for coordinates outside the plateau', () => {
        expect(PlateauService.isCoordsValid(plateau, -1, 0)).to.be.false;
        expect(PlateauService.isCoordsValid(plateau, 6, 5)).to.be.false;
        expect(PlateauService.isCoordsValid(plateau, 5, 6)).to.be.false;
        expect(PlateauService.isCoordsValid(plateau, 6, 6)).to.be.false;
    });
    it('should return false for negative coordinates', () => {
        expect(PlateauService.isCoordsValid(plateau, -1, -1)).to.be.false;
        expect(PlateauService.isCoordsValid(plateau, -1, 2)).to.be.false;
        expect(PlateauService.isCoordsValid(plateau, 2, -1)).to.be.false;
    });
});
