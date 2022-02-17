import { ConnectionOptions } from 'typeorm';
import './env.config'
const isProd = process.env?.PRODUCTION === 'true';

export default {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.PORT ? process.env.DB_PORT : 5432,
  username: process.env.DB_USERNAME || 'UNDEFINED_name',
  password: process.env.DB_PASSWORD || 'UNDEFINED_pass',
  database: process.env.DB_NAME || 'node_project',
  synchronize: true,
  logging: false,
  autoReconnect: true,
  reconnectTries: 3,
  reconnectInterval: 2000,
  entities: [
    `src/entity/**/*.entity.${isProd ? 'js' : 'ts'}`
  ],
  migrations: [
    `src/migration/**/*.migration.${isProd ? 'js' : 'ts'}`
  ],
  cli: {
    'entitiesDir': 'src/entity',
    'migrationsDir': 'src/migration',
  },
} as ConnectionOptions;
