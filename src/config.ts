require('dotenv').config();
import env from 'env-var';

// General
export const SERVICE_NAME = env.get('SERVICE_NAME').default('monday-aws-app').asString();
export const NODE_ENV = env.get('NODE_ENV').default('local').asString();
export const isProd = NODE_ENV.includes('prod');
export const isDev = !isProd;
export const PORT = env.get('PORT').default('8080').asPortNumber();
export const MODE = env.get('MODE').default('server').asEnum(['server', 'worker']);
export const LOGGING_LEVEL = env
  .get('LOGGING_LEVEL')
  .default('info')
  .asEnum(['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly']);
export const TUNNEL_SUBDOMAIN = env.get('TUNNEL_SUBDOMAIN').default('monday-aws-app-tunnel').asString();

export const JWT_SIGNING_SECRET = env.get('JWT_SIGNING_SECRET').asString();

export const DB_NAME = env.get('DB_NAME').asString();
export const DB_USER = env.get('DB_USER').asString();
export const DB_PASSWORD = env.get('DB_PASSWORD').asString();
export const DB_HOST = env.get('DB_HOST').asString();
