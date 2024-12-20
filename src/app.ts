import express, { Express, Request, Response } from 'express';
// import dotenv from 'dotenv';

// dotenv.config();

const app: Express = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  throw new Error("hhahaha");
  res.send('Expressss + TypeScript Server');
});


if (!process.env.LAMBDA_TASK_ROOT) {
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
  
}

export default app