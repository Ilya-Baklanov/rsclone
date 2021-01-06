import dotenv from 'dotenv';
import  path from 'path';
const envPath = path.join(__dirname, '../.env');

dotenv.config({
  path: envPath,
});

const { DB_USER, DB_NAME, DB_PASSWORD, DB_PORT } =  process.env;

export const config = {
  user: DB_USER,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT,
};
