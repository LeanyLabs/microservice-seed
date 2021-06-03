import { MODE, SERVICE_NAME, NODE_ENV } from './config';
import { logger } from './infra';
import { initSequelize } from './db';
import { startServer } from './server';
import { startWorker } from './worker';

async function start() {
  try {
    logger.info(`Starting ${SERVICE_NAME} in ${MODE} mode, NODE_ENV: ${NODE_ENV}.`);
    await initSequelize();

    switch (MODE) {
      case 'server':
        startServer();
        break;
      case 'worker':
        startWorker();
        break;
      default:
        logger.error('Uknown mode', { MODE });
        return;
    }

    logger.info(`Successfully started ${SERVICE_NAME} in ${MODE} mode, NODE_ENV: ${NODE_ENV}.`);
  } catch (err) {
    logger.error(`Failed to start ${SERVICE_NAME}.`, err);
    throw err;
  }
}

start();
