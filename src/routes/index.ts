import { Router } from 'express';
import { configUserRoute } from './fwUser/user.route';

const apiRouter = Router();

configUserRoute(apiRouter);

export default apiRouter;
