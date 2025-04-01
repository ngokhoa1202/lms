import fs from 'fs';
import path from 'path';
import Logger from './logger.config';

function readSecrets(fileName: string, type: string): string {
  try {
    const key = fs.readFileSync(path.resolve(process.cwd(), 'secrets', fileName), { encoding: 'utf8', flag: 'r' });
    Logger.info(`Successfully read ${type} secrets`);
    return key;
  } catch (error) {
    Logger.error(`Failed to read ${type} secrets: ${error}`);
    // eslint-disable-next-line n/no-process-exit
    process.exit(1);
  }
}

const PRIVATE_KEY = readSecrets('private-key.pem', 'private key');
const PUBLIC_KEY = readSecrets('public-key.pem', 'public key');
const ISSUER = 'CareerWise';
const SUBJECT = {
  ACCESS: 'LMS - Apollo',
  REFRESH: 'LMS - Dionysus'
};
const ALGORITHM = 'RS512';
const AUDIENCE = ['LMS - Hera', 'LMS - Athena', 'LMS - Artemis'];
const ACCESS_TOKEN = {
  EXPIRATION: {
    TIME: 72,
    UNIT: 'h'
  }
};
const REFRESH_TOKEN = {
  EXPIRATION: {
    TIME: 7,
    UNIT: 'd'
  }
};

const PASSWORD = {
  SALT: 12
};
export const SECRETS = { PRIVATE_KEY, PUBLIC_KEY, ISSUER, SUBJECT, AUDIENCE, ALGORITHM, ACCESS_TOKEN, REFRESH_TOKEN, PASSWORD };
