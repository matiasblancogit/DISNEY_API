const path = require('path');

const storage = path.join(__dirname, '../../../db.sqlite');

module.exports = {
  development: {
    username:process.env.USER_DB || 'homero',
    password:process.env.PASSWORD_DB||'homeron',
    database:process.env.NAME_DB||'disney-api',
    dialect: 'mysql',
    storage
  },
  test: {
    dialect: 'mysql',
    storage: ':memory'
  },
  production: {
    use_env_variable: 'DB_CONNECTION_STRING',
    dialect: 'mysql',
    logging: false
  }
};