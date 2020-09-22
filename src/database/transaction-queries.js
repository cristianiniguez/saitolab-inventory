const getConnection = require('./connection')

async function selectTransactions(type, startDate, endDate) {
  const query = `SELECT * FROM transactions_view WHERE \`type\` LIKE '%${type}%' AND \`date\` BETWEEN '${startDate}' AND '${endDate}' ORDER BY \`date\``
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
  const query = 'UPDATE transactions SET id_product=?, quantity=?, type=?, date=? WHERE id=?'
  const { idProduct, quantity, type, date, id } = transaction
  try {
    const connection = await getConnection()
    const response = await connection.query(query, [idProduct, quantity, type, date, id])
    return response
  } catch (error) {
    console.error(error.message)
    throw error
  }
}

async function deleteTransaction(id) {
  const query = 'DELETE FROM transactions WHERE id=?'
  try {
    const connection = await getConnection()
    const response = await connection.query(query, [id])
    return response
  } catch (error) {
    console.error(error.message)
    throw error
  }
}

module.exports = {
  selectTransactions,
  insertTransaction,
  updateTransaction,
  deleteTransaction
}