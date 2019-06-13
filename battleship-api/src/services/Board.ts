import { SHIPS } from '../config/ships';
import { MAP_KEY, MAP_SIZE } from '../config/mapKey';
export default class Board {
    private map : Array<String[]>;

    public constructor() {
        this.map = [];
        this.generateMap();
    }

    private createEmptyMap() : void {
        for(let i : number = 0; i < MAP_SIZE; ++i) {
            this.map[i] = []
            for(let j : number = 0; j < MAP_SIZE; ++j) {
                this.map[i][j] = MAP_KEY.empty;
            }
        }
    }

    private generateMap() : void {
        this.createEmptyMap();
        SHIPS.forEach((ship) => {
            for(let i : number = 0; i < ship.amount; ++i) {
                let success : boolean = this.placeShip(ship.size);
                while(!success) {
                    success = this.placeShip(ship.size);
                }
            }
        });
        this.clearBorderMarks();
    }
    private placeShip(shipSize : number) : boolean {
        let x : number = Math.trunc(Math.floor(Math.random() * MAP_SIZE));
        let y : number = Math.trunc(Math.floor(Math.random() * MAP_SIZE));
        let direction : number = Math.trunc(Math.floor(Math.random() * 2)); // 0-vertical, 1-horizontal

        switch(direction) {
            case 0: {
                if(y > MAP_SIZE - shipSize) {
                    return false;
                }
                for(let i : number = y; i < y+shipSize; ++i) {
                    if(this.map[i][x] !== MAP_KEY.empty) {
                        return false;
                    }
                }
                for(let i : number = y; i < y+shipSize; ++i) {
                    this.map[i][x] = MAP_KEY.ship;
                }
                this.drawShipBorder(x, y, direction, MAP_KEY.edge, MAP_KEY.ship);
                return true;

            }
            case 1: {
                if(x > MAP_SIZE - shipSize) {
                    return false;
                }
                for(let i : number = x; i < x+shipSize; ++i) {
                    if(this.map[y][i] !== MAP_KEY.empty) {
                        return false;
                    }
                }
                for(let i : number = x; i < x+shipSize; ++i) {
                    this.map[y][i] = MAP_KEY.ship;
                }
                this.drawShipBorder(x, y, direction, MAP_KEY.edge, MAP_KEY.ship);
                return true;
            }
        }
        return false;
    }
    private clearBorderMarks() : void{
        this.map.forEach((row, y) => {
            row.forEach((char, x) => {
                if(char === MAP_KEY.edge) {
                    this.map[y][x] = MAP_KEY.empty;
                }
            })
        });
    }
    private drawShipBorder(x : number, y : number, direction : number, borderSign : string, shipSign : string) {
        if(direction === 0) {
            let i = y-1;
            do {
                if(i < 0) {
                    i=0;
                }
                if(x===0) {
                    this.map[i][x+1] = borderSign;
                } else if(x === MAP_SIZE-1) {
                    this.map[i][x-1] = borderSign;
                } else {
                    this.map[i][x+1] = borderSign;
                    this.map[i][x-1] = borderSign;
                }
                i++;
            } while(i < MAP_SIZE && this.map[i][x] === shipSign);

            if(y-1 >= 0) {
                this.map[y-1][x] = borderSign;
            }
            if(i < MAP_SIZE) {
                this.map[i][x] = borderSign;
                if(x===0) {
                    this.map[i][x+1] = borderSign;
                } else if(x === MAP_SIZE-1) {
                    this.map[i][x-1] = borderSign;
                } else {
                    this.map[i][x+1] = borderSign;
                    this.map[i][x-1] = borderSign;
                }
            }
        } else if(direction === 1) {
            let i = x-1;
            do {
                if(i < 0) {
                    i=0;
                }
                if(y===0) {
                    this.map[y+1][i] = borderSign;
                } else if(y === MAP_SIZE-1) {
                    this.map[y-1][i] = borderSign;
                } else {
                    this.map[y+1][i] = borderSign;
                    this.map[y-1][i] = borderSign;
                }
                i++;
            } while(i < MAP_SIZE && this.map[y][i] === shipSign);

            if(x-1 >= 0) {
                this.map[y][x-1] = borderSign;
            }
            if(i < MAP_SIZE) {
                this.map[y][i] = borderSign;
                if(y===0) {
                    this.map[y+1][i] = borderSign;
                } else if(y === MAP_SIZE-1) {
                    this.map[y-1][i] = borderSign;
                } else {
                    this.map[y+1][i] = borderSign;
                    this.map[y-1][i] = borderSign;
                }
            }
        }
    }
    public getMap() {
        return this.map;
    }

    public isShipHit(x : number, y : number) : boolean {
        return (this.map[y][x] === MAP_KEY.ship) ? true : false;
    }
    public isCellEmpty(x : number, y : number) : boolean {
        return (this.map[y][x] === MAP_KEY.empty) ? true : false;
    }
    public markHitShip(x : number, y : number) {
        this.map[y][x] = MAP_KEY.hitShip;
    }
    public markMissedShip(x : number, y : number) {
        if(this.map[y][x] === MAP_KEY.empty) {
            this.map[y][x] = MAP_KEY.hitMissed;
        }
    }

    public isEntireShipDestroyed(x : number, y: number) : boolean {
        let gameMap = this.map;
        function isLeftNeighbourAShip() {
            let i = x;
            while(i > 0) {
                if(gameMap[y][i-1] === MAP_KEY.ship) {
                    return true;
                }
                if(gameMap[y][i-1] === MAP_KEY.hitShip) {
                    i--;
                }
                else {
                return false;
                }
            }
            return false;
        }
        function isRightNeighbourAShip() {
            let i = x;
            while(i < MAP_SIZE-1) {
                if(gameMap[y][i+1] === MAP_KEY.ship) {
                    return true;
                }
                if(gameMap[y][i+1] === MAP_KEY.hitShip) {
                    i++;
                }
                else {
                    return false;
                }
            }
            return false;
        }
        function isUpNeighbourAShip() {
            let i = y;
            while(i > 0) {
                if(gameMap[i-1][x] === MAP_KEY.ship) {
                    return true;
                }
                if(gameMap[i-1][x] === MAP_KEY.hitShip) {
                    i--;
                }
                else {
                    return false;
                }
            }
            return false;
        }
        function isDownNeighbourAShip() {
            let i = y;
            while(i < MAP_SIZE-1) {
                if(gameMap[i+1][x] === MAP_KEY.ship) {
                    return true;
                }
                if(gameMap[i+1][x] === MAP_KEY.hitShip) {
                    i++;
                }
                else {
                    return false;
                }
            }
            return false;
        }
        if(!isLeftNeighbourAShip() && !isRightNeighbourAShip() && !isDownNeighbourAShip() && !isUpNeighbourAShip()) {
            return true;
        }
        return false;
    }

    public drawBoarder(x : number, y : number) {
        let peak = this.findPeakOfHitShip(x, y);
        this.drawShipBorder(peak.x, peak.y, peak.direction, MAP_KEY.hitMissed, MAP_KEY.hitShip);
    }

    private findPeakOfHitShip(targetX : number, targetY : number) {
        let i = targetX;
        let direction = 1;
        while(i-1 >= 0 && this.map[targetY][i-1] === MAP_KEY.hitShip) {
            i--;
            direction = 1;
        }
        let j = targetY;
        while(j-1 >= 0 && this.map[j-1][targetX] === MAP_KEY.hitShip) {
            j--;
            direction = 0;
        }
        if(i === targetX && j === targetY) {
            if(i+1 < MAP_SIZE && this.map[targetY][i+1] === MAP_KEY.hitShip) {
                direction = 1;
            }
            else if(j+1 < MAP_SIZE && this.map[j+1][targetX] === MAP_KEY.hitShip) {
                direction = 0;
            }
        }
        return {x: i, y: j, direction};
    }
    public toGameMap() : String[][] {
        return this.map.map((row, y) => {
            return row.map((element, x) => {
                if(element === MAP_KEY.ship) {
                    return MAP_KEY.empty;
                }
                return element;
            })
        })
    }
}