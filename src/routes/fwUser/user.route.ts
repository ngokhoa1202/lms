import UserController from '@src/controller/framework/user/user.controller';
import UserValidator from '@src/controller/framework/user/validator/user.validator';
import { Router } from 'express';
import Middleware from '@src/middleware/index.middleware';
import InstructorValidator from '@src/controller/framework/user/validator/instructor.validator';

export const configUserRoute = (router: Router) => {

  router.post('/framework/users/login', Middleware.validate(UserValidator.login), UserController.login);

  router.post('/framework/instructors', Middleware.validate(InstructorValidator.creation), UserController.createInstructor);
};
