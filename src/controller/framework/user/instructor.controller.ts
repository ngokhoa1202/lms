import { NextFunction, Request, Response } from 'express';
import HttpStatusCodes from '@src/controller/HttpStatusCodes';

const createInstructor = async (req: Request, res: Response, next: NextFunction) => {
  try {

  } catch (error) {
    next(error);
  }
};

const InstructorController = { createInstructor };
