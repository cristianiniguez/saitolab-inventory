const { selectProducts, insertProduct } = require('../../database/product-queries')

const Product = require('../../models/product.model')

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
      </tr>
  `).join('')
}

async function sendProduct() {
  const name = $form_product['name'].value
  const purchasePrice = $form_product['purchase-price'].value
  const salePrice = $form_product['sale-price'].value
  const product = new Product(name, purchasePrice, salePrice)
  console.log(product)
  await insertProduct(product)
  await showProducts()
}

// Events
window.addEventListener('load', showProducts)

$form_product.addEventListener('submit', async e => {
  e.preventDefault()
  await sendProduct()
})
