import Logger from '@src/config/logger.config';
import { SECRETS } from '@src/config/secrets.config';
import { UserRole } from '@src/constants/enum/user/userRole.enum';
import User from '@src/model/framework/user/user.model';
import Util from '@src/utils/index.util';
import mongoose from 'mongoose';

const DEFAULT_PASSWORD = 'abc123ABC@#';

export async function seedUserSchema() {
  try {
    await mongoose.connect('mongodb://localhost:27017/test', {
      dbName: 'test',
      sanitizeFilter: true
    });
    Logger.info('Successfully Connected to mongoDB');

    const users = await Promise.all(Array.from({ length: 100 }).map(async (_, index) => ({
      username: `user${index}`,
      password: await Util.bcrypt.hash(DEFAULT_PASSWORD, SECRETS.PASSWORD.SALT),
      firstName: `First Name ${index}`,
      lastName: `Last Name ${index}`,
      email: `user${index}@example.com`,
      role: UserRole.NONE
    })));


    await User.insertMany(users);
    Logger.info('User schema seeded successfully');
  } catch (error) {
    Logger.error('Error seeding User schema', error);
    mongoose.connection.close();
  }
}

