module.exports = {
  development: {
    username: 'root',
    password: 'root',
    database: 'api_dev',
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
};
