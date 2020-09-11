const getConnection = require('./connection')

async function selectProducts(name) {
  const query = `SELECT * FROM products WHERE name LIKE '%${name}%'`
  try {
    const connection = await getConnection()
    const response = await connection.query(query)
    return response
  } catch (error) {
    console.error(error.message)
  }
}

module.exports = {
  selectProducts
}