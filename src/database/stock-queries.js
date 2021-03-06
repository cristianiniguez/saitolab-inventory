const getConnection = require('./connection')

async function selectStock(productName) {
  const query = `SELECT name, purchases_value, sales_value, stock, value FROM stock_view WHERE name LIKE '%${productName}%';`
  try {
    const connection = await getConnection()
    const response = await connection.query(query)
    return response
  } catch (error) {
    console.error(error.message)
    throw error
  }
}

async function selectStockValues() {
  const query = `
    SELECT SUM(purchases_value) AS purchases,
    SUM(sales_value) AS sales,
    SUM(profit) AS profit,
    SUM(value) AS value
    from stock_view;
  `
  try {
    const connection = await getConnection()
    const response = await connection.query(query)
    return response[0]
  } catch (error) {
    console.error(error.message)
    throw error
  }
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
  selectStockValues,
  selectAvialableStock
}