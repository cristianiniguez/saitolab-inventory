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

async function insertProduct(product) {
  const query = 'INSERT INTO products (`name`, `purchase_price`, `sale_price`) VALUES (?, ?, ?)'
  try {
    const connection = await getConnection()
    const response = await connection.query(query, [product.name, product.purchasePrice, product.salePrice])
    return response
  } catch (error) {
    console.error(error.message)
  }
}

module.exports = {
  selectProducts,
  insertProduct
}