import { body, param } from 'express-validator';

const gettingById = [
  param('id').trim().escape().isUUID().withMessage('User id is invalid')
];

const creation = [
  body('email').trim().escape().notEmpty().withMessage('Email is required')
    .isString().isLength({ min: 3, max: 255 }).withMessage('Email must be between 3 and 255 characters')
    .isEmail().withMessage('Email is invalid'),
  body('username').trim().escape().optional().notEmpty().withMessage('Username is required')
    .isString().isLength({ min: 3, max: 255 }).withMessage('Username must be between 3 and 255 characters')
    .matches(/^[a-zA-Z0-9_-]*$/).withMessage('Username must contain only letters, numbers, dash and underscores'),
  body('password').trim().escape().notEmpty().withMessage('Password is required')
    .isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
    .withMessage('Password must be at least 8 characters long and contain at least one lowercase letter, \
      one uppercase letter, one number and one symbol'),
  body('role').optional().trim().escape().notEmpty().withMessage('Role is required')
    .isAlphanumeric().withMessage('Role is invalid')
    .isLength({ min: 3, max: 255 }).withMessage('Role must be between 3 and 255 characters')
];

const update = [
  param('id').trim().escape().isUUID().withMessage('User id is invalid'),
  body('email').trim().escape().isEmail().withMessage('Email is invalid'),
  body('username').trim().escape().notEmpty().withMessage('Username is required')
    .isString().isLength({ min: 3, max: 255 }).withMessage('Username must be between 3 and 255 characters')
    .matches(/^[a-zA-Z0-9_-]*$/).withMessage('Username must contain only letters, numbers, dash and underscores'),
  body('password').trim().escape().notEmpty().withMessage('Password is required')
    .isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
    .isLength({ max: 255 }).withMessage('Password has a maximum length of 255 characters')
    .withMessage('Password must be at least 8 characters long and contain at least one lowercase letter, \
      one uppercase letter, one number and one symbol'),
  body('role').optional().trim().escape().isAlphanumeric().withMessage('Role is invalid')
    .isLength({ min: 3, max: 255 }).withMessage('Role must be between 3 and 255 characters')
];

const login = [
  body('email').trim().escape().notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Email is invalid'),
  body('password').trim().escape().notEmpty().withMessage('Password is required')
];

export const UserValidator = { gettingById, creation, update, login };
