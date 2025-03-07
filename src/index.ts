import { logger } from './config/logger';
import { ENV } from './config/env';

import server from './server';

/******************************************************************************
                                  Run
******************************************************************************/

const SERVER_START_MSG = ('Express server started on port: ' +
  ENV.Port);

server.listen(ENV.Port, () => logger.info(SERVER_START_MSG));
