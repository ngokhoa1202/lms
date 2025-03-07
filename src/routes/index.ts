import { Router } from 'express';
import { configFwUserRoute } from './fwUser/user.route';

const apiRouter = Router();

configFwUserRoute(apiRouter);

export default apiRouter;
