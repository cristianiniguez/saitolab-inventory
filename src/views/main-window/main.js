const { ipcRenderer } = require('electron')
const moment = require('moment')

const Product = require('../../models/product.model.js')
const Transaction = require('../../models/transaction.model.js')

// Elements
const inp_startDate = document.getElementById('start-date')
const inp_endDate = document.getElementById('end-date')

const $btn_productsWindow = document.getElementById('products-window')
const $btn_transactionsWindow = document.getElementById('transactions-window')

// Function
function setToday() {
  inp_startDate.value = moment().format('yyyy-MM-DD')
  inp_endDate.value = moment().format('yyyy-MM-DD')
}

// On load
window.addEventListener('load', () => {
  setToday()
  console.log(inp_startDate.value, inp_endDate.value)
})

// Events
$btn_productsWindow.addEventListener('click', () => {
  ipcRenderer.send('open-window', 'products')
})
$btn_transactionsWindow.addEventListener('click', () => {
  ipcRenderer.send('open-window', 'transactions')
})
