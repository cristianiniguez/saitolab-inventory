const getConnection = require('./connection')

async function selectStock(productName) {
  // const query = ``
  // try {
  //   const connection = await getConnection()
  //   const response = await connection.query(query)
  //   return response
  // } catch (error) {
  //   console.error(error.message)
  //   throw error
  // }
}

async function selectAvialableStock(idProduct) {
  const query = `
    SELECT id_product,
    SUM(IF(type = 'purchase', quantity, 0)) - SUM(IF(type = 'sale', quantity, 0)) AS stock
    FROM transactions
    GROUP BY id_product
    HAVING id_product = '${idProduct}';
  `
  try {
    const connection = await getConnection()
    const response = await connection.query(query)
    return response[0] ? response[0].stock : 0
  } catch (error) {
    console.error(error.message)
    throw error
  }
}

module.exports = {
  selectStock,
  selectAvialableStock
}