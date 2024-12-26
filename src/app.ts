import express, { Express, Request, Response } from 'express';
import { configure } from 'cwisite';
import { cache } from 'cwisite/cache';

const app: Express = express();

configure(app);

app.get('/ping', cache(100), (req: Request, res: Response) => {
  console.log(app.locals.config.get('LOG_LEVEL'));
  console.log(app.locals.config.get('DB_PASSWORD'));

  res.send('pong');
});

if (!process.env.LAMBDA_TASK_ROOT) {
  const port = app.locals.config.get('PORT');

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}

export default app;
