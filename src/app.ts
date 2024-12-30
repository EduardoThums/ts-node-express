import express, { Express, Request, Response, NextFunction, ErrorRequestHandler } from 'express';
// import { configure } from 'cwisite';
// import { cache } from 'cwisite/cache';
// import { configure as configureLogger } from 'cwilog';
// import { configure as configureSecrets } from 'cwisecrets'
import {
  getParameter,
  getParametersByName,
} from '@aws-lambda-powertools/parameters/ssm';
import config from 'config'
import { withTransaction, configure as configureDatabase } from '@services/db'
import { configure as configureLogger } from '@services/logger'

const app: Express = express();

async function configureSecrets(app: Express): Promise<void> {
  if (process.env.LAMBDA_TASK_ROOT) {
    
    const parameter: string = await getParameter('/teste', { transform: 'json', maxAge: 120 });
    // const parameter: string = "{\"DB_PASSWORD\":1}";
    // console.log(typeof JSON.parse(parameter))
    // app.locals.logger.info(parameter)
    config.util.extendDeep(config, parameter);
  }

  app.locals.config = config;
}

app.get('/ping', (req: Request, res: Response) => {
  // app.locals.logger.info("hello from /ping")
  // app.locals.logger.info(`LOG_LEVEL: ${app.locals.config.get('LOG_LEVEL')}`)
  app.locals.logger.info(`DB_PASSWORD: ${app.locals.config.get('DB_PASSWORD')}`)
  // console.log("hello from /ping")
    // console.log(app.locals.config.get('LOG_LEVEL'));
  // console.log(app.locals.config.get('DB_PASSWORD'));

  res.send('pong');
});

app.get('/db', async (req: Request, res: Response) => {
  let response

  await withTransaction(async client => {
    const res = await client.query('SELECT $1::text as message', ['Hello world!'])
    console.log() // Hello world!
    response = res.rows[0].message
  })
  
  res.send(response);
});

export async function createApp() {
  await configureSecrets(app)
  configureLogger(app)
  configureDatabase(app)
  return app
}
