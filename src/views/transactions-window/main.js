const { ipcRenderer, remote } = require('electron')
const moment = require('moment')

const { selectProducts } = remote.require('./database/product-queries')

// Global variables

// Elements
const $form_transaction = document.getElementById('form-transaction')
const $form_searchTransaction = document.getElementById('form-search-transaction')

// Functions
async function showProductsList() {
  try {
    $form_transaction['product'].innerHTML = ''
    const products = await selectProducts('')
    console.log(products[0])
    $form_transaction['product'].innerHTML = products.map(p => `<option value="${p.id}">${p.name}</option>`).join('')
  } catch (error) {
    showMsgDialog({ type: 'error', message: 'An error ocurred while updating product: ' + error.message })
    console.error(error)
  }
}

function setToday() {
  $form_transaction['date'].value = moment().format('yyyy-MM-DD')
  $form_searchTransaction['date-from'].value = moment().format('yyyy-MM-DD')
  $form_searchTransaction['date-to'].value = moment().format('yyyy-MM-DD')
}

function showMsgDialog(options) {
  ipcRenderer.send('show-msg-dialog', { win: 'productsWindow', ...options })
}

// Events
window.addEventListener('load', async () => {
  await showProductsList()
  setToday()
})