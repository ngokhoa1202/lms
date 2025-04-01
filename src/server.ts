import morgan from 'morgan';
import helmet from 'helmet';
import express from 'express';
import 'express-async-errors';
import { ENV } from './config/env.config';
import { NodeEnv } from './constants/NodeEnv';
import apiRouter from './routes/index.route';
import { connectDb } from './config/db.config';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocs } from './config/swagger.config';
import Middleware from './middleware/index.middleware';
import cookieParser from 'cookie-parser';

(async () => {
  await connectDb(ENV.DbHost, ENV.DbPort, ENV.DbUsername, ENV.DbPassword, ENV.DbName);
})();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' }));

app.use(cookieParser());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api', apiRouter);
app.use(Middleware.handleError);

if (ENV.NodeEnv === NodeEnv.Development) {
  app.use(morgan('dev'));
}

if (ENV.NodeEnv === NodeEnv.Production) {
  app.use(helmet());
}

export default app;
