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
import { isRunningInAws } from '@services/utils'
import Router from 'express-promise-router'
import { STATUS_CODES } from 'http';

const app: Express = express();

async function configureSecrets(app: Express): Promise<void> {
  if (isRunningInAws()) {
    
    const parameter: string = await getParameter('/teste', { transform: 'json', maxAge: 120 });
    // const parameter: string = "{\"DB_PASSWORD\":1}";
    // console.log(typeof JSON.parse(parameter))
    // app.locals.logger.info(parameter)
    config.util.extendDeep(config, parameter);
  }

  app.locals.config = config;
}

class ValidationError extends Error {
  code?: string;
  http_status_code: number;

  constructor(message?: string, code?: string, http_status_code: number) {
    super(message);
    this.name = "ValidationError";
    this.code = code;
    this.http_status_code = http_status_code;
  }
}


const router = Router();

router.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Start of the route: ${req.method} ${req.url}`)
  next()
  // res.status(500).json({ message: err.message });
});

router.get('/hello', function routeHandler(req, res) {
  // throw new Error('Oops!');
  res.send('world')
});

router.get('/error-sync', function routeHandler() {
  throw new Error('Oops!');
});

router.get('/error-async', async function asyncRouteHandler(req, res, next) {
  throw new ValidationError('Oops!', 'VALIDATION_ERROR', 400);
    try {
    throw new Error('Oops!');
  } catch (err) {
    // The `next()` function tells Express to go to the next middleware
    // in the chain. Express doesn't handle async errors, so you need to
    // report errors by calling `next()`.
    return next(err);
  }
});

router.use((err, req: Request, res: Response, next: NextFunction) => {
  console.log(`error in ${req.method} ${req.url}`)

  let code
  let message
  let http_status_code: number

  if (err instanceof ValidationError) {
    code = err.code
    message = err.message
    http_status_code = err.http_status_code

  } else {
    code = "INTERNAL_SERVER_ERROR"
    message = err.message
    http_status_code = 500
  }

  // console.log('handling error')
  res.status(http_status_code).json({ message: err.message, code });
});

app.use(router)

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
  // find another way to init a global variable in a ES module
  configureLogger(app)
  configureDatabase(app)
  return app
}
