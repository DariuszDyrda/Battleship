import { SHIPS } from '../config/ships';
import { MAP_KEY, MAP_SIZE } from '../config/mapKey';

import Board from './Board';
import Stats from './Stats';
import UserData from '../models/UserData';

export default class Game {
    private usersData : Map<String, UserData>;
    public constructor() {
        this.usersData = new Map<String, UserData>();
    }

    public startGame(gameId : String) : object {
        let board = new Board();
        let stats = new Stats();

        let userData = { board, stats }

        this.usersData.set(gameId, userData);

        let gameMap = board.toGameMap();

        return { gameMap, stats};
    }

    public shoot(gameId : String, x : number, y : number) : any {
        let userData = this.usersData.get(gameId);
        if(typeof userData === 'undefined') {
            throw Error('No data for this user. Start the game first');
        }
        let board = userData.board;
        let stats = userData.stats;
        let gameMap = board.toGameMap();
        let hit = false;

        if(x >= MAP_SIZE || y >= MAP_SIZE) {
            return userData;
        }

        if(board.isShipHit(x, y)) {
            stats.decreaseTargetsLeft();
            stats.increaseShotsTaken();
            stats.checkGameOver();
            board.markHitShip(x, y);
            if(board.isEntireShipDestroyed(x, y)) {
                board.drawBoarder(x, y);
            }
            hit = true;
        } else {
            stats.increaseShotsTaken();
            board.markMissedShip(x, y);
        }
        return { gameMap, stats, hit };

    }
    
    // public mapToString() : void {
    //     let indexes = '  ';
    //     for(let i : number = 0; i < this.SIZE; ++i) {
    //         indexes+=`${i} `;
    //     }
    //     console.log(indexes);
    //     this.map.forEach((row : Array<String>, index) => {
    //         let rowString = `${index} `;
    //         row.forEach(element => {
    //             rowString+=`${element} `;
    //         })
    //         console.log(rowString);
    //     });
    // }
}
