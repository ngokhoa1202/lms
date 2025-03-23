import { NextFunction, Request, Response } from 'express';
import HttpStatusCodes from '@src/controller/HttpStatusCodes';
import { IUserLoginDto } from '@src/controller/framework/user/dto/user.dto';
import { UserService } from '@src/service/fwUser/user/user.service';


const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body as IUserLoginDto;
    const token = await UserService.login(user);
    res.json(HttpStatusCodes.OK).send(token);
  } catch (error) {
    next(error);
  }
};

const UserController = { login };
export default UserController;
