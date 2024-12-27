import serverlessExpress from '@codegenie/serverless-express';
import app from './app.js';

// @ts-expect-error
export const handler = serverlessExpress({ app });
