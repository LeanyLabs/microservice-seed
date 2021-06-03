import express from 'express';
import { PORT, SERVICE_NAME } from './config';
import routes from './routes';
import { logger } from './infra';
import { handleErrors } from './middlewares/error-handler.middleware';
import { tracer } from './middlewares/tracer';

export async function startServer() {
  try {
    const app = express();

    app
      .use(tracer)
      .use(express.json({ limit: '10mb' }))
      .use(express.urlencoded({ extended: true }))
      .use(routes)
      .use(handleErrors);

    app.listen(PORT, function () {
      logger.info(`${SERVICE_NAME} server started at http://localhost:${PORT}`);
    });
  } catch (err) {
    logger.error(`Failed to start ${SERVICE_NAME} server`, { err });
  }
}
