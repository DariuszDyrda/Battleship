export default class GameService {
    private SIZE : number = 10;
    private ships = [
        {
            size: 4,
            amount: 1
        },
        {
            size: 3,
            amount: 2
        },
        {
            size: 2,
            amount: 3
        },
        {
            size: 1,
            amount: 4
        }
    ];
    private map : String[][];

    private mapKey = {
        empty: ' ',
        hitMissed: '-',
        ship: 'x',
        hitShip: 'o',
        edge: 'e' // marks the border of the ship, helps to generate the map
    }

    private stats = {
        targetsLeft: this.calculateTotalTargets(),
    }

    public constructor() {
        this.map =[];
    }

    public shoot(x : number, y : number) : any {
        let response = {
            gameOver: false,
            hit: false,
            map: this.getGameMap()
        }
        if(x >= this.SIZE || y >= this.SIZE) {
            return response;
        }
        if(this.map[y][x] === this.mapKey.ship) {
            this.map[y][x] = this.mapKey.hitShip;
            this.stats.targetsLeft--;
            let gameOver = this.isGameOver();
            let isEntireShipDestroyed = this.isEntireShipDestroyed(x, y);
            if(isEntireShipDestroyed) {
                let peak = this.findPeakOfHitShip(x, y);
                this.drawShipBorder(peak.x, peak.y, peak.direction, this.mapKey.hitMissed, this.mapKey.hitShip);
            }
            return {...response, map: this.getGameMap(), gameOver, hit: true };
        }
        if(this.map[y][x] === this.mapKey.empty) {
            this.map[y][x] = this.mapKey.hitMissed;
        }
        return { ...response, map: this.getGameMap() };
    }

    public generateMap() : void {
        this.generateEmptyMap();
        this.ships.forEach((ship) => {
            for(let i : number = 0; i < ship.amount; ++i) {
                let success : boolean = this.placeShip(ship.size);
                while(!success) {
                    success = this.placeShip(ship.size);
                }
            }
        });
        this.clearBorderMarks();
    }

    private calculateTotalTargets() : number{
        return this.ships.reduce((prev, current) => {
            return prev + (current.amount*current.size);
        }, 0);
    }

    private isGameOver() : boolean {
        if(this.stats.targetsLeft <= 0) {
            return true;
        }
        return false;
    }

    public getMap() : String[][] {
        return this.map;
    }
    public getGameMap() : String[][] {
        return this.map.map((row, y) => {
            return row.map((element, x) => {
                if(element === this.mapKey.ship) {
                    return this.mapKey.empty;
                }
                return element;
            })
        })
    }
    public getStats() : any {
        return this.stats;
    }

    private generateEmptyMap() : void {
        for(let i : number = 0; i < this.SIZE; ++i) {
            this.map[i] = []
            for(let j : number = 0; j < this.SIZE; ++j) {
                this.map[i][j] = this.mapKey.empty;
            }
        }
    }

    private placeShip(shipSize : number) : boolean {
        let x : number = Math.trunc(Math.floor(Math.random() * this.SIZE));
        let y : number = Math.trunc(Math.floor(Math.random() * this.SIZE));
        let direction : number = Math.trunc(Math.floor(Math.random() * 2)); // 0-vertical, 1-horizontal

        switch(direction) {
            case 0: {
                if(y > this.SIZE - shipSize) {
                    return false;
                }
                for(let i : number = y; i < y+shipSize; ++i) {
                    if(this.map[i][x] !== this.mapKey.empty) {
                        return false;
                    }
                }
                for(let i : number = y; i < y+shipSize; ++i) {
                    this.map[i][x] = this.mapKey.ship;
                }
                this.drawShipBorder(x, y, direction, this.mapKey.edge, this.mapKey.ship);
                return true;

            }
            case 1: {
                if(x > this.SIZE - shipSize) {
                    return false;
                }
                for(let i : number = x; i < x+shipSize; ++i) {
                    if(this.map[y][i] !== this.mapKey.empty) {
                        return false;
                    }
                }
                for(let i : number = x; i < x+shipSize; ++i) {
                    this.map[y][i] = this.mapKey.ship;
                }
                this.drawShipBorder(x, y, direction, this.mapKey.edge, this.mapKey.ship);
                return true;
            }
        }
        return false;
    }
    private clearBorderMarks() : void{
        this.map.forEach((row, y) => {
            row.forEach((char, x) => {
                if(char === this.mapKey.edge) {
                    this.map[y][x] = this.mapKey.empty;
                }
            })
        });
    }
    private findPeakOfHitShip(targetX : number, targetY : number) {
        let i = targetX;
        let direction = 1;
        while(i-1 >= 0 && this.map[targetY][i-1] === this.mapKey.hitShip) {
            i--;
            direction = 1;
        }
        let j = targetY;
        while(j-1 >= 0 && this.map[j-1][targetX] === this.mapKey.hitShip) {
            j--;
            direction = 0;
        }
        if(i === targetX && j === targetY) {
            if(i+1 < this.SIZE && this.map[targetY][i+1] === this.mapKey.hitShip) {
                direction = 1;
            }
            else if(j+1 < this.SIZE && this.map[j+1][targetX] === this.mapKey.hitShip) {
                direction = 0;
            }
        }
        return {x: i, y: j, direction};
    }
    private isEntireShipDestroyed(x : number, y: number) {
        let gameMap = this.map;
        let mapKey = this.mapKey;
        const SIZE = this.SIZE;
        function isLeftNeighbourAShip() {
            let i = x;
            while(i > 0) {
                if(gameMap[y][i-1] === mapKey.ship) {
                    return true;
                }
                if(gameMap[y][i-1] === mapKey.hitShip) {
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
            while(i < SIZE-1) {
                if(gameMap[y][i+1] === mapKey.ship) {
                    return true;
                }
                if(gameMap[y][i+1] === mapKey.hitShip) {
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
                if(gameMap[i-1][x] === mapKey.ship) {
                    return true;
                }
                if(gameMap[i-1][x] === mapKey.hitShip) {
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
            while(i < SIZE-1) {
                if(gameMap[i+1][x] === mapKey.ship) {
                    return true;
                }
                if(gameMap[i+1][x] === mapKey.hitShip) {
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
    private drawShipBorder(x : number, y : number, direction : number, borderSign : string, shipSign : string) {
        if(direction === 0) {
            let i = y-1;
            do {
                if(i < 0) {
                    i=0;
                }
                if(x===0) {
                    this.map[i][x+1] = borderSign;
                } else if(x === this.SIZE-1) {
                    this.map[i][x-1] = borderSign;
                } else {
                    this.map[i][x+1] = borderSign;
                    this.map[i][x-1] = borderSign;
                }
                i++;
            } while(i < this.SIZE && this.map[i][x] === shipSign);

            if(y-1 >= 0) {
                this.map[y-1][x] = borderSign;
            }
            if(i < this.SIZE) {
                this.map[i][x] = borderSign;
                if(x===0) {
                    this.map[i][x+1] = borderSign;
                } else if(x === this.SIZE-1) {
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
                } else if(y === this.SIZE-1) {
                    this.map[y-1][i] = borderSign;
                } else {
                    this.map[y+1][i] = borderSign;
                    this.map[y-1][i] = borderSign;
                }
                i++;
            } while(i < this.SIZE && this.map[y][i] === shipSign);

            if(x-1 >= 0) {
                this.map[y][x-1] = borderSign;
            }
            if(i < this.SIZE) {
                this.map[y][i] = borderSign;
                if(y===0) {
                    this.map[y+1][i] = borderSign;
                } else if(y === this.SIZE-1) {
                    this.map[y-1][i] = borderSign;
                } else {
                    this.map[y+1][i] = borderSign;
                    this.map[y-1][i] = borderSign;
                }
            }
        }
    }
    public mapToString() : void {
        let indexes = '  ';
        for(let i : number = 0; i < this.SIZE; ++i) {
            indexes+=`${i} `;
        }
        console.log(indexes);
        this.map.forEach((row : Array<String>, index) => {
            let rowString = `${index} `;
            row.forEach(element => {
                rowString+=`${element} `;
            })
            console.log(rowString);
        });
    }
}