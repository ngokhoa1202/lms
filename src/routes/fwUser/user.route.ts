import { UserController } from '@src/controller/fwUser/user/user.controller';
import { UserValidator } from '@src/controller/fwUser/user/validator/user.validator';
import { Router } from 'express';
import Middleware from '@src/middleware';

export const configUserRoute = (router: Router) => {

  router.post('/framework/users/login', Middleware.validate(UserValidator.login), UserController.login);
};
