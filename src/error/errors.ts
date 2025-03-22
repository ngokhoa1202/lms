import HttpStatusCodes from '@src/controller/HttpStatusCodes';
import { RestError } from '@src/middleware/errorHandler.middleware';

export abstract class AppliationError extends Error {
  public readonly message: string;
  public readonly fields: string[];

  protected constructor(message: string, ...fields: string[]) {
    super(message);
    this.fields = [...fields];
    this.message = message;
    Object.setPrototypeOf(this, AppliationError.prototype);
  }

  public abstract toRestError(): RestError;

  public static default(message: string): InternalServerError {
    return InternalServerError.of(message);
  }
}

export class InvalidFieldError extends AppliationError {

  private constructor(message: string, ...fields: string[]) {
    super(message, ...fields);
    Object.setPrototypeOf(this, InvalidFieldError.prototype);
  }

  public static of(field: string, message: string | null | undefined): InvalidFieldError {
    return new InvalidFieldError(field, message ?? `${field} is invalid`);
  }

  public override toRestError(): RestError {
    return new RestError(this.message, HttpStatusCodes.BAD_REQUEST, ...this.fields);
  }
}

export class EntityNotFoundError extends AppliationError {

  private constructor(entity: string, field: string) {
    super(`${entity} is not found`, field);
    Object.setPrototypeOf(this, EntityNotFoundError.prototype);
  }

  public static of(entity: string, field: string): EntityNotFoundError {
    return new EntityNotFoundError(entity, field);
  }

  public override toRestError(): RestError {
    return new RestError(this.message, HttpStatusCodes.NOT_FOUND, ...this.fields);
  }
}


export class EntityAlreadyExistedError extends AppliationError {

  private constructor(entity: string, field: string) {
    super(`${entity} is already existed`, field);
    Object.setPrototypeOf(this, EntityAlreadyExistedError.prototype);
  }

  public static of(entity: string, field: string): EntityAlreadyExistedError {
    return new EntityAlreadyExistedError(entity, field);
  }

  public override toRestError(): RestError {
    return new RestError(this.message, HttpStatusCodes.CONFLICT, ...this.fields);
  }
}

export class UnauthorizedError extends AppliationError {

  private constructor() {
    super('undefined', 'Credentials are unauthorized');
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

  public static of(): UnauthorizedError {
    return new UnauthorizedError();
  }

  public override toRestError(): RestError {
    return new RestError(this.message, HttpStatusCodes.UNAUTHORIZED, ...this.fields);
  }
}

export class BusinessError extends AppliationError {

  private constructor(message: string, ...fields: string[]) {
    super(message, ...fields);
    Object.setPrototypeOf(this, BusinessError.prototype);
  }

  public static of(message: string, ...fields: string[]): BusinessError {
    return new BusinessError(message, ...fields);
  }

  public override toRestError(): RestError {
    return new RestError(this.message, HttpStatusCodes.BAD_REQUEST, ...this.fields);
  }
}

export class InternalServerError extends AppliationError {

  private constructor(message: string) {
    super(message, 'unknown');
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }

  public static of(message: string): InternalServerError {
    return new InternalServerError(message);
  }

  public override toRestError(): RestError {
    return new RestError(this.message, HttpStatusCodes.INTERNAL_SERVER_ERROR, 'unknown');
  }
}


