import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

// Railway proporciona DATABASE_URL, pero también podemos usar variables individuales
const getDbConfig = (): DataSourceOptions => {
  // Si existe DATABASE_URL, úsala (Railway)
  if (process.env.DATABASE_URL) {
    return {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      synchronize: false,
      logging: process.env.NODE_ENV === 'development',
      entities: ['dist/entities/**/*.js'],
      migrations: ['dist/migrations/**/*.js'],
      subscribers: [],
    };
  }

  // Para desarrollo local
  return {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_DATABASE || 'user_management_db',
    synchronize: false,
    logging: process.env.NODE_ENV === 'development',
    entities: ['dist/entities/**/*.js'],
    migrations: ['dist/migrations/**/*.js'],
    subscribers: [],
  };
};

export const AppDataSource = new DataSource(getDbConfig());