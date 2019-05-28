import GameService from '../../services/Game';
import { Router, Response, Request } from 'express';
const route = Router();

export default (app) => {
    app.use('/', route);

    let gameServiceInstance : GameService = new GameService();

    route.get('/start', (req:Request, res:Response) => {
        gameServiceInstance = new GameService();
        gameServiceInstance.generateMap();
        let map = gameServiceInstance.getGameMap();
        res.json(map);
    });
    route.post('/shoot', (req:Request, res:Response) => {
        let gameStatus : object = gameServiceInstance.shoot(req.body.x, req.body.y);
        res.json({ gameStatus });
    })
}