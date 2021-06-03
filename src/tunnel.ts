import { PORT } from './config';
import { logger, createTunnel } from './infra';

async function start() {
  try {
    const closeTunnel = await createTunnel(PORT, () => {
      process.exit();
    });
    process.on('beforeExit', () => closeTunnel());
  } catch (err) {
    logger.error('Failed to start tunnel', { err });
  }
}

start();
