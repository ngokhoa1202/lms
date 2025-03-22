import { UserController } from '@src/controller/framework/user/user.controller';
import UserValidator from '@src/controller/framework/user/validator/user.validator';
import { Router } from 'express';
import Middleware from '@src/middleware/index.middleware';

export const configUserRoute = (router: Router) => {

  router.post('/framework/users/login', Middleware.validate(UserValidator.login), UserController.login);
  router.post('/framework/instructors/login');
};
