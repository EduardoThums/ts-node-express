import { Express } from 'express';
import { Logger } from '@aws-lambda-powertools/logger';

let logger: Logger | undefined

export const configure = (app: Express): void => {
  logger = new Logger({ logLevel: app.locals.config.get('LOG_LEVEL') });
};

export default logger
