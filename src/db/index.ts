import { sequelize } from './sequelize';
export { sequelize } from './sequelize';
import { logger } from '../infra';
export { Comment } from './comment.model';

export async function initSequelize() {
  try {
    logger.info('Trying to connect to the database');
    await sequelize.sync();
    logger.info('DB connection has been established successfully.');
  } catch (err) {
    logger.error('Failed to establish DB conection', err);
    throw err;
  }
}
