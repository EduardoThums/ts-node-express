import express, { Express, Request, Response } from 'express';
// import express, { Express, Request, Response, NextFunction } from 'express';
import config from 'config';
// import { configure as initLog } from 'cwilog';
import { configure } from 'cwisite';
import { cache } from 'cwisite/cache';
// import { configure } from 'cwilog';
// import { hello } from '@services/a';
// import dotenv from 'dotenv';

// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// import { Logger } from '@aws-lambda-powertools/logger';

// Get the file path and directory name
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// console.log(__dirname);

config.util.extendDeep(config, { DB_PASSWORD: '12346' });

// console.log(newObject.DB_PASSWORD);
// process.env["NODE_CONFIG_DIR"] = __dirname + "../configDir/";
// console.log(process.env["NODE_CONFIG_DIR"])
// dotenv.config();

const app: Express = express();
// app.

// const globalLogger = (req: Request, res: Response, next: NextFunction) => {
//   res.locals.logger = new Logger();
//   next();
// };

configure(app);
// app.use(initLog);

// const logger = new Logger({ logLevel: 'INFO' });

const port = 3000;

// function cache(ttlSeconds: number) {
//   return function (req: Request, res: Response, next: NextFunction) {
//     console.log('applying ttl for ' + ttlSeconds);
//     next();
//   };
// }

app.get('/ping', cache(100), (req: Request, res: Response) => {
  // throw new Error("hhahaha");
  // console.log(config.get('Customer.credit.initialDays'));
  // res.locals.logger.info('hello world from ping');

  try {
    throw new Error('vishsss');
  } catch (error) {
    console.log(error);
    // res.locals.logger.error('meu primeiro erro', error as Error);
  }
  // hello()
  res.send('pong');
});

if (!process.env.LAMBDA_TASK_ROOT) {
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}

export default app;
