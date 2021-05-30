import { Sequelize } from 'sequelize';
import User from './user';
const ENV = process.env.NODE_ENV ?? 'development';
/* eslint-disable @typescript-eslint/no-var-requires */
const { database, username, password, host, dialect } =
  require('../../config/database.js')[ENV];
/* eslint-enable */

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
});

const db = {
  User: User.initialize(sequelize),
};

Object.values(db).forEach((model) => {
  if (model.associate) {
    model.associate();
  }
});

export default db;
