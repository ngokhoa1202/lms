import User, { IUser } from '@src/model/framework/user/user.model';
import { IUserCreationDto, IUserDto, IUserLoginDto, IUserUpdateDto } from '@src/controller/framework/user/dto/user.dto';
import bcrypt from 'bcrypt';

import { IAccessToken } from '@src/controller/framework/user/dto/token.dto';
import { Algorithm, sign, SignOptions } from 'jsonwebtoken';
import { EntityNotFoundError, UnauthorizedError } from '@src/error/errors';
import { SECRETS } from '@src/config/secrets.config';
import Util from '@src/utils/index.util';
import { ManipulateType } from 'dayjs';

const login = async (dto: IUserLoginDto): Promise<IAccessToken> => {
  const user = await User.findOne({ email: dto.email }).exec();
  if (!user) {
    throw EntityNotFoundError.of('User', 'email');
  }
  const passwordMatch = await bcrypt.compare(dto.password, user.password);
  if (!passwordMatch) {
    throw UnauthorizedError.of('password');
  }
  const options: SignOptions = {
    algorithm: SECRETS.ALGORITHM as Algorithm,
    expiresIn: '72h',
    issuer: SECRETS.ISSUER,
    subject: SECRETS.SUBJECT.ACCESS,
    audience: SECRETS.AUDIENCE,
    encoding: 'utf-8',
    notBefore: '30s'
  };
  const token = sign({ id: user._id, role: user.role }, SECRETS.PRIVATE_KEY, options);
  return { token, expiration: Util.dayjs().add(SECRETS.EXPIRATION.TIME, SECRETS.EXPIRATION.UNIT as ManipulateType).unix() };
};

export const UserService = { login };
