const { ipcRenderer, remote } = require('electron')
const moment = require('moment')

const { selectProducts, getProductPrice } = remote.require('./database/product-queries')
const { selectTransactions, insertTransaction, updateTransaction, deleteTransaction } = remote.require('./database/transaction-queries')

const Transaction = require('../../models/transaction.model')

// Global variables
let updateStatus = false
let updateId = null

// Elements
const $form_transaction = document.getElementById('form-transaction')
const $form_searchTransaction = document.getElementById('form-search-transaction')
const $table_transactions = document.getElementById('table-transactions')
const $overlay = document.querySelector('.overlay')

// Functions
async function showProductsList() {
  try {
    $form_transaction['product'].innerHTML = '<option value=""></option>'
    const products = await selectProducts('')
    $form_transaction['product'].innerHTML += products.map(p => `<option value="${p.id}">${p.name}</option>`).join('')
  } catch (error) {
    showMsgDialog({ type: 'error', message: 'An error ocurred while showing products: ' + error.message })
    console.error(error)
  }
}

async function getAmount() {
  const idProduct = $form_transaction['product'].value
  const quantity = $form_transaction['quantity'].value
  const type = $form_transaction['type'].value
  if (idProduct === '' || type === '') {
    $form_transaction['amount'].value = ''
    return
  }
  try {
    const price = await getProductPrice(idProduct, type)
    $form_transaction['amount'].value = (price * quantity).toFixed(2)
  } catch (error) {
    showMsgDialog({ type: 'error', message: 'An error ocurred while getting amount: ' + error.message })
    console.error(error)
  }
}

function setDates() {
  setToday()
  $form_searchTransaction['start-date'].value = moment().date(1).format('yyyy-MM-DD')
  $form_searchTransaction['end-date'].value = moment().add(1, 'months').date(1).subtract(1, 'days').format('yyyy-MM-DD')
}

function setToday() {
  $form_transaction['date'].value = moment().format('yyyy-MM-DD')
}

async function showTransactions() {
  $overlay.style.display = "block"
  const tableBody = $table_transactions.querySelector('tbody')
  tableBody.innerHTML = ''
  const type = $form_searchTransaction['type'].value
  const startDate = $form_searchTransaction['start-date'].value
  const endDate = $form_searchTransaction['end-date'].value
  try {
    const transactions = await selectTransactions(type, startDate, endDate)
    tableBody.innerHTML = transactions.map(t => `
      <tr>
        <td>${t.name}</td>
        <td>${t.quantity}</td>
        <td>${t.type}</td>
        <td>${t.price}</td>
        <td>${t.amount}</td>
        <td>${moment(t.date).format('yyyy-MM-DD')}</td>
        <td>
          <button class="btn btn-primary btn-update"
            data-id=${t.id}
            data-idProduct=${t.id_product}
            data-quantity=${t.quantity}
            data-type=${t.type}
            data-date=${moment(t.date).format('yyyy-MM-DD')}
          >Editar</button>
          <button class="btn btn-danger btn-delete" data-id=${t.id}>Eliminar</button>
        </td>
      </tr>
    `).join('')
    setClickEvents()
  } catch (error) {
    showMsgDialog({ type: 'error', message: 'An error ocurred while getting transaction: ' + error.message })
    console.error(error)
  } finally {
    $overlay.style.display = "none"
  }
}

async function sendTransaction() {
  const idProduct = $form_transaction['product'].value
  const quantity = $form_transaction['quantity'].value
  const type = $form_transaction['type'].value
  const date = $form_transaction['date'].value
  if (idProduct === '' || type === '') {
    showMsgDialog({ type: 'warning', message: 'Invalid data' })
    return
  }
  if (!updateStatus) {
    try {
      const transaction = new Transaction(idProduct, quantity, type, date)
      console.log(transaction)
      const response = await insertTransaction(transaction)
      showMsgDialog({ type: 'info', message: 'Transaction inserted successfully' })
      $form_transaction.reset()
      setToday()
      await showTransactions()
    } catch (error) {
      showMsgDialog({ type: 'error', message: 'An error ocurred while inserting transaction: ' + error.message })
      console.error(error)
    }
  } else {
    try {
      const transaction = new Transaction(idProduct, quantity, type, date, updateId)
      const response = await updateTransaction(transaction)
      showMsgDialog({ type: 'info', message: 'Transaction updated successfully' })
      updateStatus = false
      updateId = null
      $form_transaction['btn-submit'].value = 'Save'
      $form_transaction.reset()
      setToday()
      await showTransactions()
    } catch (error) {
      showMsgDialog({ type: 'error', message: 'An error ocurred while updating transaction: ' + error.message })
      console.error(error)
    }
  }
}

function setClickEvents() {
  $table_transactions.querySelectorAll('.btn-update').forEach($btn => {
    $btn.addEventListener('click', async e => {
      const { id, idproduct, quantity, type, date } = e.target.dataset
      updateId = id
      $form_transaction['product'].value = idproduct
      $form_transaction['quantity'].value = quantity
      $form_transaction['type'].value = type
      $form_transaction['date'].value = date
      $form_transaction['btn-submit'].innerText = 'Update'
      await getAmount()
      updateStatus = true
    })
  })
  $table_transactions.querySelectorAll('.btn-delete').forEach($btn => {
    $btn.addEventListener('click', async e => {
      const { id } = e.target.dataset
      const confirmation = confirm('Are you sure you want to delete the transaction?')
      if (confirmation) {
        try {
          const response = await deleteTransaction(id)
          showMsgDialog({ type: 'info', message: 'Transaction deleted successfully' })
          await showTransactions()
        } catch (error) {
          showMsgDialog({ type: 'error', message: 'An error ocurred while deleting transaction: ' + error.message })
          console.error(error)
        }
      }
    })
  })
}

function showMsgDialog(options) {
  ipcRenderer.send('show-msg-dialog', { win: 'transactionsWindow', ...options })
}

// Events
window.addEventListener('load', async () => {
  await showProductsList()
  setDates()
  await showTransactions()
})

$form_transaction['product'].addEventListener('change', getAmount)
$form_transaction['quantity'].addEventListener('change', getAmount)
$form_transaction['type'].addEventListener('change', getAmount)

$form_transaction.addEventListener('submit', async e => {
  e.preventDefault()
  await sendTransaction()
})

$form_searchTransaction.addEventListener('submit', async e => {
  e.preventDefault()
  await showTransactions()
})