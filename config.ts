import path from 'path';
import dotenv from 'dotenv';
import moduleAlias from 'module-alias';

/*******************************************************************************
 * Environment variables *******************************************************
 *******************************************************************************/

const NODE_ENV = (process.env.NODE_ENV ?? 'development');
const env = dotenv.config({
  path: path.join(__dirname, `./environment/.env.${NODE_ENV}`)
});

if (env.error) {
  throw env.error;
}
// Configure moduleAlias
if (__filename.endsWith('js')) {
  moduleAlias.addAlias('@src', __dirname + '/dist');
}



