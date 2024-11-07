// This is the logic that connects to the DB
const mariadb = require("mariadb");
const dotenv = require("dotenv");

dotenv.config();

const LOCAL_DB = {
  host: "127.0.0.1",
  port: process.env.DB_PORT_LOCAL,
  user: process.env.DB_USER,
  password: process.env.DB_USER_PWD,
  database: process.env.DB_NAME,
  connectionLimit: 5,
};

const AWS_DB = {
  host: process.env.HOST,
  port: process.env.DB_PORT_AWS,
  user: process.env.DB_USER_AWS,
  password: process.env.DB_PWD_AWS,
  database: process.env.DB_NAME_AWS,
  connectionLimit: 5,
};

//const pool = mariadb.createPool(AWS_DB);
const pool = mariadb.createPool(LOCAL_DB);

// Expose a method to establish connection with MariaDB SkySQL
module.exports = Object.freeze({
  pool: pool,
});
