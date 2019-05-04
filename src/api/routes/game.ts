import GameService from '../../services/Game';
import { Router, Response, Request } from 'express';
const route = Router();

export default (app) => {
    app.use('/', route);

    const gameServiceInstance : GameService = GameService.getInstance();

    route.get('/start', (req:Request, res:Response) => {
        let map = gameServiceInstance.getMap();
        gameServiceInstance.mapToString();
        res.json(map);
    });
    route.post('/shoot', (req:Request, res:Response) => {
        let gameStatus : object = gameServiceInstance.shoot(req.body.x, req.body.y);
        res.json({ gameStatus });
    })
}