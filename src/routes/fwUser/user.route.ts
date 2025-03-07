import { createUser } from '@src/controller/user/user.controller';
import { Router } from 'express';

export const configFwUserRoute = (router: Router) => {

  router.post('/framework/user', createUser);

};
