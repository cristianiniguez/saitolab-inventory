const { ipcRenderer, remote } = require('electron')
const moment = require('moment')

const { selectProducts, getProductPrice } = remote.require('./database/product-queries')

// Global variables

// Elements
const $form_transaction = document.getElementById('form-transaction')
const $form_searchTransaction = document.getElementById('form-search-transaction')

// Functions
async function showProductsList() {
  try {
    $form_transaction['product'].innerHTML = '<option value=""></option>'
    const products = await selectProducts('')
    console.log(products[0])
    $form_transaction['product'].innerHTML += products.map(p => `<option value="${p.id}">${p.name}</option>`).join('')
  } catch (error) {
    showMsgDialog({ type: 'error', message: 'An error ocurred while showing products: ' + error.message })
    console.error(error)
  }
}

async function getAmount() {
  const productId = $form_transaction['product'].value
  const quantity = $form_transaction['quantity'].value
  const type = $form_transaction['type'].value
  if (productId === '' || type === '') {
    $form_transaction['amount'].value = ''
    return
  }
  try {
    const price = await getProductPrice(productId, type)
    $form_transaction['amount'].value = (price * quantity).toFixed(2)
  } catch (error) {
    showMsgDialog({ type: 'error', message: 'An error ocurred while getting amount: ' + error.message })
    console.error(error)
  }
}

function setToday() {
  $form_transaction['date'].value = moment().format('yyyy-MM-DD')
  $form_searchTransaction['start-date'].value = moment().format('yyyy-MM-DD')
  $form_searchTransaction['end-date'].value = moment().format('yyyy-MM-DD')
}

function showMsgDialog(options) {
  ipcRenderer.send('show-msg-dialog', { win: 'productsWindow', ...options })
}

// Events
window.addEventListener('load', async () => {
  await showProductsList()
  setToday()
})

$form_transaction['product'].addEventListener('change', getAmount)
$form_transaction['quantity'].addEventListener('change', getAmount)
$form_transaction['type'].addEventListener('change', getAmount)