import 'dotenv/config';
import { getEnv } from 'src/infrastructure/utils/getEnv.util';
import { DataSourceOptions } from 'typeorm';

const port = +(getEnv('POSTGRES_PORT') as string);
const username = getEnv('POSTGRES_USER');
const password = getEnv('POSTGRES_PASSWORD');
const database = getEnv('POSTGRES_DB');
const host = getEnv('POSTGRES_HOST') || 'localhost';

const entities = ['dist/**/*.entity{.ts,.js}'];

const typeormConfig: DataSourceOptions = {
  type: 'postgres',
  host,
  port,
  username,
  password,
  database,
  entities,
  migrations: ['dist/infrastructure/database/migrations/*.js'],
  migrationsTableName: 'migrations',
  synchronize: false,
  poolSize: 50,
};

export default typeormConfig;
