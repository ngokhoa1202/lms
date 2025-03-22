import { validate } from '@src/middleware/validation.middleware';
import { authenticate } from '@src/middleware/authentication.middleware';
import { handleError } from '@src/middleware/errorHandler.middleware';

const Middleware = { validate, authenticate, handleError };

export default Middleware;
