import GameService from '../../services/Game';
import { Router, Response, Request } from 'express';
const route = Router();

export default (app) => {
    app.use('/', route);

    let gameServiceInstance = new GameService();

    route.get('/start', (req:Request, res:Response) => {
        let userData = {};
        if(req.sessionID) {
            userData = gameServiceInstance.startGame(req.sessionID);
        }
        res.json(userData);
    });
    route.post('/shoot', (req:Request, res:Response) => {
        let userData = {};
        if(req.sessionID) {
            userData = gameServiceInstance.shoot(req.sessionID, req.body.x, req.body.y);
        }
        res.json(userData);
    })
}