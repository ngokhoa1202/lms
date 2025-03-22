import { NextFunction, Request, Response } from 'express';
import HttpStatusCodes from '@src/controller/HttpStatusCodes';
import { IUserCreationDto, IUserDto, IUserLoginDto, IUserUpdateDto } from '@src/controller/framework/user/dto/user.dto';
import { validationResult } from 'express-validator';
import { UserService } from '@src/service/fwUser/user/user.service';


const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next(errors.array()[0]);
    }
    const userCreationDto: IUserCreationDto = req.body as IUserCreationDto;
    const id = await UserService.createUser(userCreationDto);
    res.location(`/api/framework/users/${id}`).status(HttpStatusCodes.CREATED).send();
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next(errors.array()[0]);
    }
    const { id } = req.params;
    const user = await UserService.getUserById(id);
    res.status(HttpStatusCodes.OK).send(user);
  } catch (error) {
    next(error);
  }
};

const updateUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next(errors.array()[0]);
    }
    const { id } = req.params;
    const dto = req.body as IUserUpdateDto;
    const user = await UserService.updateUserById(id, dto);
    res.status(HttpStatusCodes.OK).send(user);
  } catch (error) {
    next(error);
  }
};

const deleteUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next(errors.array()[0]);
    }
    const { id } = req.params;
    await UserService.deleteUserById(id);
    res.status(HttpStatusCodes.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body as IUserLoginDto;
    const token = await UserService.login(user);
    res.json(HttpStatusCodes.OK).send(token);
  } catch (error) {
    next(error);
  }
};

export const UserController = { createUser, getUserById, updateUserById, deleteUserById, login };
