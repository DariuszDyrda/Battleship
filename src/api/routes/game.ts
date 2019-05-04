import GameService from '../../services/Game';
import { Router, Response, Request } from 'express';
const route = Router();

export default (app) => {
    app.use('/', route)
    route.get('/start', (req:Request, res:Response) => {
        const gameServiceInstance : GameService = GameService.getInstance();
        let map = gameServiceInstance.getMap();
        gameServiceInstance.mapToString();
        res.json(map);
    })
}