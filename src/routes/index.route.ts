import { Router } from 'express';
import { configUserRoute } from './framework/user/user.route';

const apiRouter = Router();

configUserRoute(apiRouter);

export default apiRouter;
