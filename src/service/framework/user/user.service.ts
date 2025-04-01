import { IUserCreationDto, IUserDto, IUserLoginDto, IUserUpdateDto } from '@src/controller/framework/user/dto/user.dto';
import User from '@src/model/framework/user/user.model';

import { SECRETS } from '@src/config/secrets.config';
import { UserRole } from '@src/constants/enum/user/userRole.enum';
import { ITokenDto } from '@src/controller/framework/user/dto/token.dto';
import { EntityNotFoundError, UnauthorizedError } from '@src/error/errors';
import Util from '@src/utils/index.util';
import { ManipulateType } from 'dayjs';
import { Algorithm, SignOptions } from 'jsonwebtoken';
import { UserRepo } from '@src/repository/index.repository';
import { isJSDocNonNullableType } from 'typescript';

const login = async (dto: IUserLoginDto): Promise<ITokenDto> => {
  const user = await UserRepo.findByEmail(dto.email);
  if (!user) {
    throw EntityNotFoundError.of('User', 'email');
  }
  const passwordMatch = await Util.bcrypt.compare(dto.password, user.password);
  if (!passwordMatch) {
    throw UnauthorizedError.of('password');
  }

  const accessTokenSignOptions: SignOptions = {
    algorithm: SECRETS.ALGORITHM as Algorithm,
    expiresIn: '72h',
    issuer: SECRETS.ISSUER,
    subject: SECRETS.SUBJECT.ACCESS,
    audience: SECRETS.AUDIENCE,
    encoding: 'utf-8',
    notBefore: '30s'
  };
  const refreshTokenSignOptions: SignOptions = {
    algorithm: SECRETS.ALGORITHM as Algorithm,
    expiresIn: '7d',
    issuer: SECRETS.ISSUER,
    subject: SECRETS.SUBJECT.REFRESH,
    audience: SECRETS.AUDIENCE,
    encoding: 'utf-8',
    notBefore: '30s'
  };
  const accessToken = Util.Jwt.sign({ id: user._id, role: user.role }, SECRETS.PRIVATE_KEY, accessTokenSignOptions);
  const refreshToken = Util.Jwt.sign({ id: user._id, role: user.role }, SECRETS.PRIVATE_KEY, refreshTokenSignOptions);
  return {
    accessToken: {
      token: accessToken,
      expiration: Util.dayjs().add(SECRETS.ACCESS_TOKEN.EXPIRATION.TIME, SECRETS.ACCESS_TOKEN.EXPIRATION.UNIT as ManipulateType).unix()
    },
    refreshToken: {
      token: refreshToken,
      expiration: Util.dayjs().add(SECRETS.REFRESH_TOKEN.EXPIRATION.TIME, SECRETS.REFRESH_TOKEN.EXPIRATION.UNIT as ManipulateType).unix()
    }
  };
};

const createUser = async (dto: IUserCreationDto): Promise<IUserDto> => {
  const passwordHashed = await Util.bcrypt.hash(dto.password, SECRETS.PASSWORD.SALT);
  const userCreated = await UserRepo.create({
    _id: Util.Uuid.v4(),
    username: dto.username ?? dto.email,
    firstName: dto.firstName,
    lastName: dto.lastName,
    email: dto.email,
    password: passwordHashed,
    role: UserRole.NONE
  });
  return {
    id: userCreated._id, email: userCreated.email, username: userCreated.username,
    role: userCreated.role, firstName: userCreated.firstName, lastName: userCreated.lastName
  };
};

const updateUser = async (id: string, dto: IUserUpdateDto): Promise<IUserDto> => {
  const userUpdated = await UserRepo.update({
    _id: id,
    firstName: dto.firstName,
    lastName: dto.lastName
  });
  if (!userUpdated) {
    throw EntityNotFoundError.of('User', 'id');
  }
  return { ...userUpdated, id: userUpdated._id };
};

const deleteUser = async (id: string): Promise<void> => {
  const user = await User.findByIdAndDelete(id).exec();
  if (!user) {
    throw EntityNotFoundError.of('User', 'id');
  }
};

const findUserById = async (id: string): Promise<IUserDto> => {
  const user = await User.findById(id).select('-password').lean().exec();
  if (!user) {
    throw EntityNotFoundError.of('User', 'id');
  }
  return { ...user, id: user._id };
};

export const UserService = { login, createUser, deleteUser, updateUser, findUserById };
