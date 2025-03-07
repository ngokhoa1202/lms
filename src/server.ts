import morgan from 'morgan';
import helmet from 'helmet';
import express from 'express';


import 'express-async-errors';
import { ENV } from './config/env';
import { NodeEnv } from './constants/NodeEnv';
import apiRouter from './routes';
import { connectDb } from './config/db';

(async () => {
  await connectDb(ENV.DbHost, ENV.DbPort, ENV.DbUsername, ENV.DbPassword, ENV.DbName);
})();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' }));

app.use('/api', apiRouter);


if (ENV.NodeEnv === NodeEnv.Development) {
  app.use(morgan('dev'));
}

if (ENV.NodeEnv === NodeEnv.Production) {
  app.use(helmet());
}

export default app;
