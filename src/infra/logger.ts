import { createLogger, format, transports } from 'winston';
import { consoleFormat } from 'winston-console-format';
import { isProd, LOGGING_LEVEL, SERVICE_NAME } from '../config';

function createProdLogger() {
  return createLogger({
    level: LOGGING_LEVEL,
    format: format.combine(
      format.timestamp(),
      format.ms(),
      format.errors({ stack: true }),
      format.splat(),
      format.json()
    ),
    transports: [new transports.Console()],
  });
}

function createDevLogger() {
  return createLogger({
    level: LOGGING_LEVEL,
    format: format.combine(
      format.timestamp(),
      format.ms(),
      format.errors({ stack: true }),
      format.splat(),
      format.json()
    ),
    defaultMeta: { service: SERVICE_NAME },
    transports: [
      new transports.Console({
        format: format.combine(
          format.colorize({ all: true }),
          format.padLevels(),
          consoleFormat({
            showMeta: true,
            metaStrip: ['timestamp', 'service'],
            inspectOptions: {
              depth: Infinity,
              colors: true,
              maxArrayLength: Infinity,
              breakLength: 120,
              compact: Infinity,
            },
          })
        ),
      }),
    ],
  });
}

export const logger = isProd ? createProdLogger() : createDevLogger();
export default logger;
