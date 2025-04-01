import { NextFunction, Request, Response } from 'express';
import { IInstructorCreationDto } from './dto/instructor.dto';

const createInstructor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const instructor = req.body as IInstructorCreationDto;

  } catch (error) {
    next(error);
  }
};

const InstructorController = { createInstructor };
