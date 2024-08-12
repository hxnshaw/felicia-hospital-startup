require("dotenv").config();

let config = {
  development: {
    database: process.env.DB_DATABASE_NAME,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        required: true,
        rejectUnauthorized: false,
      },
    },

    test: {
      username: "root",
      password: null,
      database: "database_test",
      host: "127.0.0.1",
      dialect: "mysql",
      dialectOptions: {
        ssl: {
          required: true,
          rejectUnauthorized: false,
        },
      },
    },
    production: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE_NAME,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: "postgres",
      dialectOptions: {
        ssl: {
          required: true,
          rejectUnauthorized: false,
        },
      },
    },
  },
};

module.exports = config;
