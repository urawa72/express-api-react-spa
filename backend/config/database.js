module.exports = {
  development: {
    username: 'root',
    password: 'root',
    database: 'api_dev',
    host: 'db',
    port: 3306,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
};
