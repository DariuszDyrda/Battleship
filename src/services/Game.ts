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
        empty: 'a',
        ship: 'x',
        edge: 'e'
    }

    private constructor() {
        this.map =[];
    }

    public static getInstance() : GameService {
        if(!GameService.instance) {
            GameService.instance = new GameService();
        }
        return GameService.instance;
    }

    public GenerateMap() : void {
        this.generateEmptyMap();
        this.ships.forEach((ship) => {
            for(let i : number = 0; i < ship.amount; ++i) {
                let success : boolean = this.placeShip(ship.size);
                while(!success) {
                    success = this.placeShip(ship.size);
                }
            }
        })
    }

    public getMap() : String[][] {
        return this.map;
    }

    private generateEmptyMap() : void {
        for(let i : number = 0; i < this.SIZE; ++i) {
            this.map[i] = []
            for(let j : number = 0; j < this.SIZE; ++j) {
                this.map[i][j] = this.mapKey.empty;
            }
        }
    }

    public placeShip(shipSize : number) : boolean {
        let x : number = Math.trunc(Math.floor(Math.random() * this.SIZE));
        let y : number = Math.trunc(Math.floor(Math.random() * this.SIZE));
        let direction : number = 0// Math.trunc(Math.floor(Math.random() * 2)); // 0-vertical, 1-horizontal

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
                console.log(`The ship was places at x: ${x} y: ${y} SIZE: ${shipSize}`);
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
                } else if(x === this.SIZE-1) {
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