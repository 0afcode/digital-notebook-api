import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { User } from './src/user/user.entity';

config({ path: 'src/env/.env.development' });

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.MARIADB_HOST,
  port: parseInt(process.env.MARIADB_PORT as string),
  username: process.env.MARIADB_USER,
  password: process.env.MARIADB_PASS,
  database: process.env.MARIADB_NAME,
  entities: [User],
  migrations: ['dist/migrations/*.js'], // Path to your compiled migration files
  synchronize: false, // Set to true only for development, never in production
});
