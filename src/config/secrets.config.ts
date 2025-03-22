import fs from 'fs';
import path from 'path';
import { logger } from './logger.config';

function readSecrets(fileName: string, type: string): string {
  try {
    const key = fs.readFileSync(path.join(__dirname, '../../secrets', fileName), { encoding: 'utf8', flag: 'r' });
    logger.info(`Successfully read ${type} secrets`);
    return key;
  } catch (error) {
    logger.error(`Failed to read ${type} secrets: ${error}`);
    // eslint-disable-next-line n/no-process-exit
    process.exit(1);
  }
}

const PRIVATE_KEY = readSecrets('private-key.pem', 'private key');
const PUBLIC_KEY = readSecrets('public-key.pem', 'public key');
const ISSUER = 'CareerWise';
const SUBJECT = {
  ACCESS: 'LMS - Apollo'
};
const ALGORITHM = 'RS512';
const AUDIENCE = ['LMS - Hera', 'LMS - Athena', 'LMS - Artemis'];
const EXPIRATION = {
  TIME: 72,
  UNIT: 'h'
};
export const SECRETS = { PRIVATE_KEY, PUBLIC_KEY, ISSUER, SUBJECT, AUDIENCE, ALGORITHM, EXPIRATION };
