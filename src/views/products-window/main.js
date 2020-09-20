const { ipcRenderer, remote } = require('electron')
const { selectProducts, insertProduct, updateProduct } = remote.require('./database/product-queries')

const Product = require('../../models/product.model')

// Global variables
let updateStatus = false
let updateId = null

// Elements
const $form_product = document.getElementById('form-product')
const $form_searchProduct = document.getElementById('form-search-product')
const $table_products = document.getElementById('table-products')
const $overlay = document.querySelector('.overlay')

// Functions
async function showProducts() {
  $overlay.style.display = "block"
  const tableBody = $table_products.querySelector('tbody')
  tableBody.innerHTML = ""
  try {
    const products = await selectProducts($form_searchProduct['input-search-product'].value)
    tableBody.innerHTML = products.map(p => `
        <tr>
          <th scope="row">${p.id}</th>
          <td>${p.name}</td>
          <td>${p.purchase_price}</td>
          <td>${p.sale_price}</td>
          <td>
            <button class="btn btn-primary btn-update" data-id=${p.id} data-name=${p.name} data-purchase_price=${p.purchase_price} data-sale_price=${p.sale_price}>Editar</button>
            <button class="btn btn-danger btn-delete" data-id=${p.id}>Eliminar</button>
          </td>
        </tr>
    `).join('')
    setClickEvents()
  } catch (error) {
    showMsgDialog({ type: 'error', message: 'An error ocurred while showing products: ' + error.message })
    console.error(error)
  } finally {
    $overlay.style.display = "none"
  }
}

async function sendProduct() {
  const name = $form_product['name'].value
  const purchasePrice = $form_product['purchase-price'].value
  const salePrice = $form_product['sale-price'].value
  if (!updateStatus) {
    try {
      const product = new Product(name, purchasePrice, salePrice)
      const response = await insertProduct(product);
      showMsgDialog({ type: 'info', message: 'Product inserted successfully' })
      await showProducts();
    } catch (error) {
      showMsgDialog({ type: 'error', message: 'An error ocurred while inserting product: ' + error.message })
      console.error(error)
    }
  } else {
    try {
      const product = new Product(name, purchasePrice, salePrice, updateId)
      const response = await updateProduct(product);
      showMsgDialog({ type: 'info', message: 'Product updated successfully' })
      updateStatus = false
      updateId = null
      $form_product['btn-submit'].innerText = 'Save'
      $form_product.reset()
      await showProducts();
    } catch (error) {
      showMsgDialog({ type: 'error', message: 'An error ocurred while updating product: ' + error.message })
      console.error(error)
    }
  }
}

function setClickEvents() {
  $table_products.querySelectorAll('.btn-update').forEach($btn => {
    $btn.addEventListener('click', e => {
      const { id, name, purchase_price, sale_price } = e.target.dataset
      updateId = id
      $form_product['name'].value = name
      $form_product['purchase-price'].value = purchase_price
      $form_product['sale-price'].value = sale_price
      $form_product['btn-submit'].innerText = 'Update'
      updateStatus = true
    })
  })
  $table_products.querySelectorAll('.btn-delete').forEach($btn => {
    $btn.addEventListener('click', e => {
      console.log(e.target.dataset)
      console.log('Eliminando')
    })
  })
}

function showMsgDialog(options) {
  ipcRenderer.send('show-msg-dialog', { win: 'productsWindow', ...options })
}

// Events
window.addEventListener('load', showProducts)

$form_product.addEventListener('submit', async e => {
  e.preventDefault()
  await sendProduct()
})

$form_searchProduct.addEventListener('submit', async e => {
  e.preventDefault()
  await showProducts()
})