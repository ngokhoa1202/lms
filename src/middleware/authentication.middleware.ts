import { IAccessToken } from '@src/controller/framework/user/dto/token.dto';
import { UnauthorizedError } from '@src/error/errors';
import { NextFunction, Request, Response } from 'express';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.cookies.accessToken || req.cookies.accessToken) {
      throw UnauthorizedError.of('accessToken');
    }
    const token: IAccessToken = req.cookies.accessToken as IAccessToken;
  } catch (error) {

  }

};
