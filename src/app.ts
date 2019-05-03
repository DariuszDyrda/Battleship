import * as express from 'express';
import config from './config';

async function startServer() {

    const app = express.default();

    await require('./loaders').default({ expressApp: app });
  
    app.listen(config.PORT, err => {
      if (err) {
        console.log(err);
        process.exit(1);
        return;
      }
      console.log('################################################')
      console.log('Server listening on port: ', config.PORT)
      console.log('################################################')
    });
  }
  
  startServer();

