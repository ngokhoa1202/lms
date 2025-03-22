import { ContextRunner } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { InvalidFieldError } from '@src/error/errors';

interface IValidationError {
  path: string;
  msg: string;
}

export const validate = (validations: ContextRunner[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (const validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        const error = result.array({ onlyFirstError: true })[0] as IValidationError;
        throw InvalidFieldError.of(error.path, error.msg);
      }
    }
    next();
  };
};
