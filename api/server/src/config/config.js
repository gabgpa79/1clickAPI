require("dotenv").config();

module.exports = {
  // If using onine database
  // development: {
  //   use_env_variable: 'DATABASE_URL'
  // },

  development: {
    database: "click",
    username: "postgres",
    password: "ileana2121",
    host: "192.168.0.16",
    dialect: "postgres",
  },

  test: {
    database: "click",
    username: "postgres",
    password: "ileana2121",
    host: "127.0.0.1",
    dialect: "postgres",
  },

  production: {
    database: "click",
    username: "postgres",
    password: "ileana2121",
    host: "127.0.0.1",
    dialect: "postgres",
  },
};
