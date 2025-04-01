import { ENV } from '@src/config/env.config';
import HttpStatusCodes from '@src/controller/HttpStatusCodes';
import { IInstructorCreationDto } from '@src/controller/framework/user/dto/instructor.dto';
import { ITokenDto } from '@src/controller/framework/user/dto/token.dto';
import { IUserCreationDto, IUserLoginDto, IUserUpdateDto } from '@src/controller/framework/user/dto/user.dto';
import { EntityNotFoundError } from '@src/error/errors';
import University from '@src/model/category/organization/university.model';
import { UserService } from '@src/service/framework/user/user.service';
import Util from '@src/utils/index.util';
import { NextFunction, Request, Response } from 'express';


const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body as IUserLoginDto;
    const token: ITokenDto = await UserService.login(user);
    res.cookie('accessToken', JSON.stringify(token.accessToken), {
      maxAge: Util.dayjs().add(token.accessToken.expiration, 'seconds').valueOf(),
      httpOnly: true,
      secure: true,
      domain: ENV.Host,
      priority: 'high'
    });
    res.cookie('refreshToken', JSON.stringify(token.refreshToken), {
      maxAge: Util.dayjs().add(token.refreshToken.expiration, 'seconds').valueOf(),
      httpOnly: true,
      secure: true,
      domain: ENV.Host,
      priority: 'high'
    });

    res.status(HttpStatusCodes.OK).send(token);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body as IUserCreationDto;
    const userCreated = await UserService.createUser(user);
    res.status(HttpStatusCodes.CREATED).send(userCreated);
  } catch (error) {
    next(error);
  }
};


const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await UserService.deleteUser(id);
    res.status(HttpStatusCodes.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
};


const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = req.body as IUserUpdateDto;
    const userUpdated = await UserService.updateUser(id, user);
    res.status(HttpStatusCodes.OK).send(userUpdated);
  } catch (error) {
    next(error);
  }
};

const createInstructor = async (dto: IInstructorCreationDto) => {
  const universities = await Promise.any(dto.degrees.map(async (degree) => {
    const university = await University.findById(degree.universityId).exec();
    if (!university) {
      throw EntityNotFoundError.of('University', 'degree.universityId');
    }
    return university;
  }));
  return universities;
};

const UserController = { login, createUser, deleteUser, updateUser };
export default UserController;
