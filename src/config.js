require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 8989,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL:
    process.env.DATABASE_URL || 'postgres://postgres@localhost/poem_db',
};
