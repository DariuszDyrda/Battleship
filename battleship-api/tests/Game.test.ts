import GameService from '../src/services/Game';
import { expect } from 'chai';
import 'mocha';

describe("Game Service", () => {
    const MAP_SIZE = 10;
    var gameServiceInstance: GameService;
    beforeEach(() => {
        gameServiceInstance = new GameService();
        gameServiceInstance.generateMap();
    })
    it('should return generated map', () => {
        let array = gameServiceInstance.getMap();
        expect(array).to.be.a('array');
        expect(array).to.have.lengthOf(MAP_SIZE);
        array.forEach(row => {
            expect(row).to.have.lengthOf(MAP_SIZE);
        })
    })
    it('should return gameStatus object', () => {
        let x = Math.floor(Math.random() * MAP_SIZE);
        let y = Math.floor(Math.random() * MAP_SIZE);
        let gameStatus = gameServiceInstance.shoot(x, y);
        expect(gameStatus).to.be.a('object');
        expect(gameStatus).to.have.property('hit');
        expect(gameStatus).to.have.property('gameOver');
        expect(gameStatus).to.have.property('map');
        expect(gameStatus.map).to.be.a('array');
    })
    it('should return gameStatus object when shooting outside the board', () => {
        let x = Math.floor(Math.random() * MAP_SIZE) + MAP_SIZE;
        let y = Math.floor(Math.random() * MAP_SIZE) + MAP_SIZE;
        let gameStatus = gameServiceInstance.shoot(x, y);
        expect(gameStatus).to.be.a('object');
        expect(gameStatus).to.have.property('hit');
        expect(gameStatus).to.have.property('gameOver');
        expect(gameStatus).to.have.property('map');
        expect(gameStatus.map).to.be.a('array');
        expect(gameStatus.hit).to.equal(false);
        expect(gameStatus.gameOver).to.equal(false);
    })
    it('should return game stats', () => {
        let gameStats = gameServiceInstance.getStats();
        expect(gameStats).to.be.a('object');
        expect(gameStats).to.have.property('targetsLeft');
        expect(gameStats.targetsLeft).to.equal(20);
    })
    it('should subtract targetsLeft while hit the ship', () => {
        let targetsLeft = gameServiceInstance.getStats().targetsLeft;
        let gameStatus = null;
        do {
            let x = Math.floor(Math.random() * MAP_SIZE);
            let y = Math.floor(Math.random() * MAP_SIZE);
            gameStatus = gameServiceInstance.shoot(x, y);
        } while(!gameStatus.hit);

        let targetsLeftAfterHit = gameServiceInstance.getStats().targetsLeft;
        expect(targetsLeftAfterHit).to.equal(targetsLeft-1);
    });
    it('should return map filled with spaces', () => {
        let array = gameServiceInstance.getGameMap();
        expect(array).to.be.a('array');
        expect(array).to.have.lengthOf(MAP_SIZE);
        array.forEach(row => {
            row.forEach(element => {
                expect(element).to.equal(' ');
            })
        })
    });
    it('should mark hit ship as o on game map', () => {
        let x = Math.floor(Math.random() * MAP_SIZE);
        let y = Math.floor(Math.random() * MAP_SIZE);
        let gameStatus = null;
        do {
            x = Math.floor(Math.random() * MAP_SIZE);
            y = Math.floor(Math.random() * MAP_SIZE);
            gameStatus = gameServiceInstance.shoot(x, y);
        } while(!gameStatus.hit);

        let array = gameServiceInstance.getGameMap();
        expect(array[y][x]).to.equal('o');
    });
})