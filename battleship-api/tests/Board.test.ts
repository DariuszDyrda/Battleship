import Board from '../src/services/Board';
import { expect } from 'chai';
import 'mocha';

import { MAP_SIZE } from '../src/config/mapKey';
import { totalTargets } from '../src/config/ships';

describe("Map instance", () => {
    var boardInstance: Board;
    beforeEach(() => {
        boardInstance = new Board();
    })
    it('should return generated map', () => {
        let map = boardInstance.getMap();
        expect(map).to.be.a('array');
        expect(map).to.have.lengthOf(MAP_SIZE);
        map.forEach(row => {
            expect(row).to.have.lengthOf(MAP_SIZE);
        })
    })
    it('should return map with amount of ships equal to total targets', () => {
        let array = boardInstance.getMap();
        let counter = 0;
        expect(array).to.be.a('array');
        expect(array).to.have.lengthOf(MAP_SIZE);
        array.forEach(row => {
            row.forEach(element => {
                if(element === 'x') {
                    counter++;
                }
            })
        })
        expect(counter).to.equal(totalTargets);
    });
})