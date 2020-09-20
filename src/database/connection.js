require('dotenv').config()

const mysql = require('promise-mysql')

let connection = null

async function getConnection() {
  try {
    if (!connection) {
      connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME
      })
      console.log('Connected succesfully to MySQL')
    }
    return connection
  } catch (error) {
    console.error(error)
    throw error
  }
}

module.exports = getConnection