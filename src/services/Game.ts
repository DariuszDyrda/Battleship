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
    private static instance : GameService;

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

    private constructor() {
        this.map =[];
        this.generateMap();
    }

    public static getInstance() : GameService {
        if(!GameService.instance) {
            GameService.instance = new GameService();
        }
        return GameService.instance;
    }

    public shoot(x : number, y : number) : any {
        let response = {
            gameOver: false,
            hit: false,
            map: this.map
        }
        if(x >= this.SIZE || y >= this.SIZE) {
            return response;
        }
        if(this.map[y][x] === this.mapKey.ship) {
            this.map[y][x] = this.mapKey.hitShip;
            this.stats.targetsLeft--;
            let gameOver = this.isGameOver();
            return {...response, map: this.map, gameOver, hit: true };
        }
        this.map[y][x] = this.mapKey.hitMissed;
        return { ...response, map: this.map };
    }

    private generateMap() : void {
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
            return prev + current.amount;
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

        console.log(`ATTEMPT x: ${x} y: ${y} SIZE: ${shipSize} DIRECTION: ${direction}`);

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
                this.drawShipBorder(x, y, shipSize, direction);
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
                this.drawShipBorder(x, y, shipSize, direction);
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
    private drawShipBorder(x : number, y : number, shipSize: number, direction : number) {
        if(direction === 0) {
            for(let i : number = y-1; i < y+shipSize+1; ++i) {
                if(i < 0) {
                    i=0;
                }
                if(i >= this.SIZE) {
                    break;
                }
                if(x===0) {
                    this.map[i][x+1] = this.mapKey.edge;
                } else if(x === this.SIZE-1) {
                    this.map[i][x-1] = this.mapKey.edge;
                } else {
                    this.map[i][x+1] = this.mapKey.edge;
                    this.map[i][x-1] = this.mapKey.edge;
                }
            }
            if(y-1 >= 0) {
                this.map[y-1][x] = this.mapKey.edge;
            }
            if(y+shipSize < this.SIZE) {
                this.map[y+shipSize][x] = this.mapKey.edge;
            }
        } else if(direction === 1) {
            for(let i : number = x-1; i < x+shipSize+1; ++i) {
                if(i < 0) {
                    i=0;
                }
                if(i >= this.SIZE) {
                    break;
                }
                if(y===0) {
                    this.map[y+1][i] = this.mapKey.edge;
                } else if(y === this.SIZE-1) {
                    this.map[y-1][i] = this.mapKey.edge;
                } else {
                    this.map[y+1][i] = this.mapKey.edge;
                    this.map[y-1][i] = this.mapKey.edge;
                }
            }
            if(x-1 >= 0) {
                this.map[y][x-1] = this.mapKey.edge;
            }
            if(x+shipSize < this.SIZE) {
                this.map[y][x+shipSize] = this.mapKey.edge;
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