import * as express from 'express';
import * as bodyParser from 'body-parser';

export default async ({ app } : {app: express.Application}) => {
    app.use(bodyParser.json());
}