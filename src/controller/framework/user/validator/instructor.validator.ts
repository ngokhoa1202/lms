import UserValidator from '@src/controller/framework/user/validator/user.validator';
import Util from '@src/utils/index.util';
import { body } from 'express-validator';


const creation = [
  ...UserValidator.creation
];

const InstructorValidator = { creation };
export default InstructorValidator;
