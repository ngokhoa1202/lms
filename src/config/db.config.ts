import mongoose from 'mongoose';
import Logger from './logger.config';

export const connectDb = async (host: string, port: number, username: string | null, password: string | null, dbName: string) => {
  try {
    await mongoose.connect(`mongodb://${host}:${port}/${dbName}`, {
      dbName,
      user: username ?? '',
      pass: password ?? '',
      sanitizeFilter: true
    });
    Logger.info('Successfully Connected to mongoDB');
  } catch (err) {
    Logger.error(err);
  }
};
