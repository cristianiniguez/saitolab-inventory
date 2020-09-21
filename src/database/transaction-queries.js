const getConnection = require('./connection')

async function selectTransactions(type, dateFrom, dateTo) {
  // TO DO
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