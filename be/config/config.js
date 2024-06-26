const env = process.env.NODE_ENV || 'development';
const uppercasedEnv = env.toUpperCase();

if (env === 'development' || env === 'test') require('dotenv').config();

const username = process.env['DB_USERNAME_' + uppercasedEnv];
const password = process.env['DB_PASSWORD_' + uppercasedEnv];
const database = process.env['DB_NAME_' + uppercasedEnv];
const host = process.env['DB_HOST_' + uppercasedEnv];
const dialect = process.env['DB_DIALECT_' + uppercasedEnv];
const port = process.env['DB_PORT_' + uppercasedEnv];

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    dialect,
    port,
  },
  test: {
    username,
    password,
    database,
    host,
    dialect,
    port,
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
