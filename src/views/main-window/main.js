const { ipcRenderer, remote } = require('electron')

const { selectStock, selectStockValues } = remote.require('./database/stock-queries')

// Elements
const $stockCards = document.getElementById('stock-cards')

const $btn_productsWindow = document.getElementById('products-window')
const $btn_transactionsWindow = document.getElementById('transactions-window')

const $form_stock = document.getElementById('form-stock')
const $table_stock = document.getElementById('table-stock')
const $overlay = document.querySelector('.overlay')

// Function
async function showStock() {
  $overlay.style.display = "block"
  const tableBody = $table_stock.querySelector('tbody')
  tableBody.innerHTML = ''
  try {
    const stock = await selectStock($form_stock['input-search-product'].value)
    tableBody.innerHTML = stock.map(st => `
      <tr>
        <td>${st.name}</td>
        <td>${st.purchases_value}</td>
        <td>${st.sales_value}</td>
        <td>${st.stock}</td>
        <td>${st.value}</td>
      </tr>
    `).join('')
  } catch (error) {
    showMsgDialog({ type: 'error', message: 'An error ocurred while showing stock: ' + error.message })
    console.error(error)
  } finally {
    $overlay.style.display = "none"
  }
}

async function showStockValues() {
  try {
    const stockValues = await selectStockValues()
    console.log(stockValues)
    $stockCards.querySelector('#purchases').innerText = stockValues.purchases
    $stockCards.querySelector('#sales').innerText = stockValues.sales
    $stockCards.querySelector('#profit').innerText = stockValues.profit
    $stockCards.querySelector('#value').innerText = stockValues.value
  } catch (error) {
    showMsgDialog({ type: 'error', message: 'An error ocurred while showing stock values: ' + error.message })
    console.error(error)
  }
}

function showMsgDialog(options) {
  ipcRenderer.send('show-msg-dialog', { win: 'mainWindow', ...options })
}

// Events
window.addEventListener('load', async () => {
  await showStock()
  await showStockValues()
})

$btn_productsWindow.addEventListener('click', () => {
  ipcRenderer.send('open-window', 'products')
})
$btn_transactionsWindow.addEventListener('click', () => {
  ipcRenderer.send('open-window', 'transactions')
})

$form_stock.addEventListener('submit', e => {
  e.preventDefault()
  showStock()
})
