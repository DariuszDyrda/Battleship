import * as express from 'express';
import * as bodyParser from 'body-parser';
import gameRoute from '../api/routes/game'
import cors from 'cors';
import session from 'express-session';


export default async ({ app } : {app: express.Application}) => {
    app.use(session({
        secret: 'i-love-husky',
        resave: true,
        saveUninitialized: true}));
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    gameRoute(app);
}