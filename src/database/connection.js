const mysql = require('promise-mysql')

let connection = null

async function getConnection() {
  try {
    if (!connection) {
      connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Rebeldemenor1',
        database: 'saitolab_inventory'
      })
    }
    return connection
  } catch (error) {
    console.error(error)
    throw error
  }
}

module.exports = getConnection