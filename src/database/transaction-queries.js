const getConnection = require('./connection')

async function selectTransactions(type, startDate, endDate) {
  const query = `SELECT * FROM transactions WHERE \`type\` LIKE '%${type}%' AND \`date\` BETWEEN '${startDate}' AND '${endDate}'`
  try {
    const connection = await getConnection()
    const response = await connection.query(query)
    return response
  } catch (error) {
    console.error(error.message)
    throw error
  }
}

async function insertTransaction(transaction) {
  const query = 'INSERT INTO transactions (`id_product`, `quantity`, `type`, `date`) VALUES (?, ?, ?, ?)'
  const { idProduct, quantity, type, date } = transaction
  try {
    const connection = await getConnection()
    const response = await connection.query(query, [idProduct, quantity, type, date])
    return response
  } catch (error) {
    console.error(error.message)
    throw error
  }
}

async function updateTransaction(transaction) {
  // TO DO
}

module.exports = {
  selectTransactions,
  insertTransaction,
  updateTransaction
}