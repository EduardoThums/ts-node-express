import express, { Express, Request, Response } from 'express';
import config from 'config';
// import { hello } from '@services/a';
// import dotenv from 'dotenv';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the file path and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(__dirname);

const newObject = config.util.extendDeep(config, { DB_PASSWORD: '12346' });

console.log(newObject.DB_PASSWORD);
// process.env["NODE_CONFIG_DIR"] = __dirname + "../configDir/";
// console.log(process.env["NODE_CONFIG_DIR"])
// dotenv.config();

const app: Express = express();
const port = 3000;

app.get('/ping', (req: Request, res: Response) => {
    // throw new Error("hhahaha");
    console.log(config.get('Customer.credit.initialDays'));
    // hello()
    res.send('pong');
});

if (!process.env.LAMBDA_TASK_ROOT) {
    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
}

export default app;
