const getConnection = require('./connection')

async function selectProducts(name) {
  const query = `SELECT * FROM products WHERE name LIKE '%${name}%'`
  try {
    const connection = await getConnection()
    const response = await connection.query(query)
    return response
  } catch (error) {
    console.error(error.message)
    throw error
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
    throw error
  }
}

async function updateProduct(product) {
  const query = 'UPDATE products SET name=?, purchase_price=?, sale_price=? WHERE id=?'
  try {
    const connection = await getConnection()
    const response = await connection.query(query, [product.name, product.purchasePrice, product.salePrice, product.id])
    return response
  } catch (error) {
    console.error(error.message)
    throw error
  }
}

module.exports = {
  selectProducts,
  insertProduct,
  updateProduct
}