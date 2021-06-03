import './config';
import { logger } from './infra';

async function experiment() {
  // place to run experiments, one-off scripts, etc
}

async function start() {
  try {
    await experiment();
  } catch (err) {
    logger.error('Experiment failed.', { err });
  }
}

start();
