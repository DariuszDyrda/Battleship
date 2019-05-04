import GameService from '../src/services/Game';
import { expect } from 'chai';
import 'mocha';

describe("Game Service", () => {
    var gameServiceInstance: GameService;
    beforeEach(() => {
        gameServiceInstance = new GameService();
    })
    it('should return empty array', () => {
        let array = gameServiceInstance.getMap();
        expect(array).to.be.a('array');
        expect(array).to.have.lengthOf(0);
    })
})