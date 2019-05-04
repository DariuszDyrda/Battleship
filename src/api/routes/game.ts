import GameService from '../../services/Game';
import { Router, Response, Request } from 'express';
const route = Router();

export default (app) => {
    app.use('/', route)
    route.get('/', (req:Request, res:Response) => {
        const gameServiceInstance : GameService = GameService.getInstance();
        gameServiceInstance.GenerateMap();
        gameServiceInstance.placeShip(5);
        gameServiceInstance.mapToString();
        res.send("Hey")
    })
}