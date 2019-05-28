import * as express from 'express';
import * as bodyParser from 'body-parser';
import gameRoute from '../api/routes/game'
import cors from 'cors';


export default async ({ app } : {app: express.Application}) => {
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    gameRoute(app);
}