import { SHIPS, totalTargets } from '../config/ships';
export default class Stats {
    private targetsLeft : number;
    private shotsTaken : number;
    private gameOver : boolean;

    public constructor() {
        this.targetsLeft = totalTargets;
        this.shotsTaken = 0;
        this.gameOver = false;
    }

    public decreaseTargetsLeft() {
        this.targetsLeft--;
    }

    public increaseShotsTaken() {
        this.shotsTaken++;
    }

    public checkGameOver() : boolean {
        if(this.targetsLeft <= 0) {
            this.gameOver = true;
            return true;
        }
        return false;
}
}