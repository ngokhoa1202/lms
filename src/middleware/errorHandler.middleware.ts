/* eslint-disable n/no-extraneous-import */
import { Request, Response, NextFunction } from 'express';
import HttpStatusCodes from '@src/controller/HttpStatusCodes';
import { MongoServerError } from 'mongodb';
import { AppliationError, EntityAlreadyExistedError, InternalServerError } from '@src/error/errors';


/**
 * Error with status code and message.
 */
export class RestError extends Error {
  public readonly fields: string[];
  public readonly message: string;
  public readonly status: HttpStatusCodes;
  public readonly timestamp: Date;

  public constructor(message: string, status: HttpStatusCodes, ...fields: string[]) {
    super(message);
    this.message = message;
    this.fields = [...fields];
    this.status = status;
    this.timestamp = new Date();
  }

  public static convert(error: MongoServerError): AppliationError {
    if (error.code === 11000) {
      const o = error.errmsg.substring(error.errmsg.indexOf('{'));
      const field = o.substring(o.indexOf(' ') + 1, o.indexOf(':') - o.indexOf(' ') + 1);
      return EntityAlreadyExistedError.of('unknown', field);
    }
    return InternalServerError.of(error.message);
  }


  public static accept(error: Error): RestError {
    if (error instanceof AppliationError) {
      return error.toRestError();
    }
    if (error instanceof MongoServerError) {
      return RestError.convert(error).toRestError();
    }
    return AppliationError.default(error.message).toRestError();
  }
}

export const handleError = (error: Error, req: Request, res: Response, next: NextFunction) => {
  const e = RestError.accept(error);
  res.status(e.status).json(e);
};



