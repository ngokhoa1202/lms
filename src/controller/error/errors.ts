import HttpStatusCodes from '@src/controller/HttpStatusCodes';


/**
 * Error with status code and message.
 */
export class RestError extends Error {
  public status: HttpStatusCodes;

  public constructor(status: HttpStatusCodes, message: string) {
    super(message);
    this.status = status;
  }
}