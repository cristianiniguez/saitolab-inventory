const { selectProducts, insertProduct } = require('../../database/product-queries')

const Product = require('../../models/product.model')

// Global variables
let updateStatus = false
let updateId = null

// Elements
const $form_product = document.getElementById('form-product')

const $input_searchProduct = document.getElementById('search-product')
const $table_products = document.getElementById('table-products')

// Function
async function showProducts() {
  const tableBody = $table_products.querySelector('tbody')
  tableBody.innerHTML = ""
  const products = await selectProducts($input_searchProduct.value)
  tableBody.innerHTML = products.map(p => `
      <tr>
        <th scope="row">${p.id}</th>
        <td>${p.name}</td>
        <td>${p.purchase_price}</td>
        <td>${p.sale_price}</td>
        <td>
          <button class="btn-update" data-id=${p.id} data-name=${p.name} data-purchase_price=${p.purchase_price} data-sale_price=${p.sale_price}>Editar</button>
          <button class="btn-delete" data-id=${p.id}>Eliminar</button>
        </td>
      </tr>
  `).join('')
  setClickEvents()
}

async function sendProduct() {
  const name = $form_product['name'].value
  const purchasePrice = $form_product['purchase-price'].value
  const salePrice = $form_product['sale-price'].value
  if (!updateStatus) {
    const product = new Product(name, purchasePrice, salePrice)
    console.log(product)
    await insertProduct(product)
    await showProducts()
  } else {
    console.log('Editando')
  }
}

function setClickEvents() {
  $table_products.querySelectorAll('.btn-update').forEach($btn => {
    console.log($btn)
    $btn.addEventListener('click', e => {
      console.log(e.target.dataset)
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
    console.log($btn)
    $btn.addEventListener('click', e => {
      console.log(e.target.dataset)
      console.log('Eliminando')
    })
  })
}

// Events
window.addEventListener('load', showProducts)

$form_product.addEventListener('submit', async e => {
  e.preventDefault()
  await sendProduct()
})
