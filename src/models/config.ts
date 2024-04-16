export const  { SECRET , DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, MONGO_URI, ELIB_CONN} = process.env;

import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(DB_NAME || 'gwx_db', DB_USER || 'root', DB_PASSWORD, {
  host: DB_HOST || 'localhost',
  dialect: 'mysql',
});
