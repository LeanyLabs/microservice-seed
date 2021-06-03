import { promisify } from 'util';
import localtunnel from 'localtunnel';
import { TUNNEL_SUBDOMAIN } from '../config';
import logger from '../infra/logger';

const pause = promisify(setTimeout);

const MAX_TRIES = 5;

export async function createTunnel(port: number, onClose: Function): Promise<Function> {
  let triesCount = 0;
  let tunnel: localtunnel.Tunnel;
  let receivedRequestedSubdomain = false;

  while (triesCount < MAX_TRIES) {
    tunnel = await localtunnel({ port, subdomain: TUNNEL_SUBDOMAIN });

    receivedRequestedSubdomain = tunnel.url.includes(TUNNEL_SUBDOMAIN);
    if (receivedRequestedSubdomain) {
      logger.info(`Created tunnel: ${tunnel.url} -> localhost:${port}`);

      tunnel.on('close', function () {
        logger.info('Tunnel closed');
        onClose();
      });
      break;
    }

    triesCount++;
    logger.warn('Could not use requested subdomain, retrying...');
    tunnel.close();
    await pause(1000);
  }

  if (!receivedRequestedSubdomain) {
    logger.error('Could not use requested subdomain, exiting...');
    return () => {};
  }

  return () => {
    tunnel.close();
  };
}
