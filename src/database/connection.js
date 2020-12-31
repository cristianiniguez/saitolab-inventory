const mysql = require('promise-mysql');
const config = require('../config');

let connection = null;

async function getConnection() {
  try {
    if (!connection) {
      connection = await mysql.createConnection({
        host: config.MYSQL_HOST,
        user: config.MYSQL_USER,
        password: config.MYSQL_PASSWORD,
        database: config.MYSQL_DB_NAME,
      });
      console.log('Connected succesfully to MySQL');
    }
    return connection;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = getConnection;
