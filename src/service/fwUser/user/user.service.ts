import User, { IUser } from '@src/model/user/user.model';
import { IUserCreationDto, IUserDto, IUserLoginDto, IUserUpdateDto } from '@src/controller/fwUser/user/dto/user.dto';
import bcrypt from 'bcrypt';

import { IAccessToken } from '@src/controller/fwUser/user/dto/token.dto';
import { sign } from 'jsonwebtoken';
import { EntityNotFoundError, UnauthorizedError } from '@src/error/errors';
import { SECRETS } from '@src/config/secrets.config';

const createUser = async (dto: IUserCreationDto): Promise<string> => {
  const passwordHashed = await bcrypt.hash(dto.password, 12);
  const user = await User.create({
    ...dto,
    username: dto.username ?? dto.email,
    password: passwordHashed,
    role: dto.role,
    firstName: dto.firstName,
    lastName: dto.lastName,
    createdAt: new Date(),
    updatedAt: new Date()
  });
  return user._id;
};

const getUserById = async (id: string): Promise<IUserDto> => {
  const user = await User.findById(id);
  if (!user) {
    throw EntityNotFoundError.of('User', 'id');
  }
  return {
    id: user._id, username: user.username, email: user.email,
    role: user.role, firstName: user.firstName, lastName: user.lastName
  };
};

const updateUserById = async (id: string, dto: IUserUpdateDto): Promise<IUserDto> => {
  const user = await User.findByIdAndUpdate(id, {
    username: dto.username,
    role: dto.role,
    firstName: dto.firstName,
    lastName: dto.lastName,
    updatedAt: new Date()
  });
  if (!user) {
    throw EntityNotFoundError.of('User', 'id');
  }
  return {
    id: user._id, username: user.username, email: user.email,
    role: user.role, firstName: user.firstName, lastName: user.lastName
  };
};

const deleteUserById = async (id: string): Promise<void> => {
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw EntityNotFoundError.of('User', 'id');
  }
};

const login = async (dto: IUserLoginDto): Promise<IAccessToken> => {
  const user = await User.findOne({ email: dto.email }).exec();
  if (!user) {
    throw EntityNotFoundError.of('User', 'email');
  }
  const passwordMatch = await bcrypt.compare(dto.password, user.password);
  if (!passwordMatch) {
    throw UnauthorizedError.of();
  }
  const token = sign({ id: user._id, email: user.email }, SECRETS.PRIVATE_KEY,
    { algorithm: 'HS512', expiresIn: '72h', issuer: SECRETS.ISSUER });
};

export const UserService = { createUser, getUserById, updateUserById, deleteUserById };
