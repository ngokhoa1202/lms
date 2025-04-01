import User, { IUserDocument, IUserModel } from '@src/model/framework/user/user.model';
import { BaseRepository, IBaseRepository } from '@src/repository/base/base.repository';

export class UserRepository extends BaseRepository<IUserDocument, IUserModel> implements IBaseRepository<IUserModel> {

  protected readonly model = User;

  public async findByEmail(email: string): Promise<IUserModel | null> {
    return this.model.findOne({ email }).lean().exec();
  }
}