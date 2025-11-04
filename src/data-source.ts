import 'dotenv/config';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [process.cwd() + '/dist/**/*.entity.js'],
  migrations: [process.cwd() + '/dist/migrations/*.js'],
  synchronize: false,
});
