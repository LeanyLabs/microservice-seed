import morgan from 'morgan';
import { logger } from '../infra';

const morganStream = {
  write: (log: string) => logger.silly(log.trim()),
};

export const tracer = morgan('short', { stream: morganStream });
