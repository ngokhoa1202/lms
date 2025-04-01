import fs from 'fs-extra';
import childProcess from 'child_process';
import { Logger } from '@src/config/logger.config';

/**
 * Start
 */
(async () => {
  try {
    // Remove current build
    await remove('./dist/');
    await exec('yarn run lint --fix', './');
    await exec('tsc --build tsconfig.prod.json', './');
    // Copy
    await copy('./temp/config.js', './config.js');
    await copy('./temp/src', './dist');
    await remove('./temp/');
  } catch (err) {
    Logger.error(err);
    // eslint-disable-next-line n/no-process-exit
    process.exit(1);
  }
})();

/**
 * Remove file
 */
async function remove(loc: string): Promise<void> {
  return new Promise((res, rej) => {
    return fs.remove(loc, err => {
      return (!!err ? rej(err) : res());
    });
  });
}

/**
 * Copy file.
 */
async function copy(src: string, dest: string): Promise<void> {
  return new Promise((res, rej) => {
    return fs.copy(src, dest, err => {
      return (!!err ? rej(err) : res());
    });
  });
}

/**
 * Do command line command.
 */
async function exec(cmd: string, loc: string): Promise<void> {
  return new Promise((res, rej) => {
    return childProcess.exec(cmd, { cwd: loc }, (err, stdout, stderr) => {
      if (!!stdout) {
        Logger.info(stdout);
      }
      if (!!stderr) {
        Logger.warn(stderr);
      }
      return (!!err ? rej(err) : res());
    });
  });
}
