/* eslint-disable n/no-extraneous-import */
import { Request, Response, NextFunction } from 'express';
import HttpStatusCodes from '@src/controller/HttpStatusCodes';
import { MongoServerError } from 'mongodb';
import { ApplicationError, EntityAlreadyExistedError, InternalServerError } from '@src/error/errors';
import Logger from '@src/config/logger.config';


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

  private static extractEntityName(error: MongoServerError): string {

    const collectionRegex = /collection: \w+\.\w+\s/;
    const collectionNameMatch = collectionRegex.exec(error.errmsg);

    // extract collection name
    if (!collectionNameMatch) return 'unknown';
    const firstPosition = collectionNameMatch[0].indexOf('.') + 1;
    return collectionNameMatch[0].substring(firstPosition, collectionNameMatch[0].length - 2);
  }

  public static convert(error: MongoServerError): ApplicationError {
    if (error.code === 11000) {
      const collectionName = RestError.extractEntityName(error);
      const o = error.errmsg.substring(error.errmsg.indexOf('{'));
      const field = o.substring(o.indexOf(' ') + 1, o.indexOf(':') - o.indexOf(' ') + 1);
      return EntityAlreadyExistedError.of(collectionName, field);
    }
    return InternalServerError.of(error.message);
  }


  public static accept(error: Error): RestError {
    if (error instanceof ApplicationError) {
      return error.toRestError();
    }
    if (error instanceof MongoServerError) {
      return RestError.convert(error).toRestError();
    }
    return ApplicationError.default(error.message).toRestError();
  }
}

export const handleError = (error: Error, req: Request, res: Response, next: NextFunction) => {
  Logger.error(error);
  const e = RestError.accept(error);
  res.status(e.status).json(e);
};



