import User from '@src/model/user/user.model';
import { Request, Response } from 'express';
import HttpStatusCodes from '../HttpStatusCodes';


export const createUser = async (req: Request, res: Response) => {
  const { username, email, password, age } = req.body as {
    username: string,
    email: string,
    password: string,
    age: number
  };
  const userCreated = await User.create({ username, email, password, age });
  res.status(HttpStatusCodes.CREATED).json(userCreated);
};
