import mongoose from 'mongoose';
import { logger } from './logger';

export const connectDb = async (host: string, port: number, username: string, password: string, dbName: string) => {
  try {
    await mongoose.connect(`mongodb://${host}:${port}/${dbName}`, {
      dbName,
      user: username ?? '',
      pass: password ?? '',
      sanitizeFilter: true
    });
    logger.info('Successfully Connected to mongoDB');
  } catch (err) {
    logger.error(err);
  }
};
