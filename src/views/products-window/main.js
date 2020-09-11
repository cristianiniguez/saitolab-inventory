const { selectProducts } = require('../../database/product-queries')

// Elements
const $inputSearch_product = document.getElementById('search-product')
const $table_products = document.getElementById('table-products')

// Function
async function showProducts() {
  const tableBody = $table_products.querySelector('tbody')
  tableBody.innerHTML = ""
  const products = await selectProducts($inputSearch_product.value)
  tableBody.innerHTML = products.map(p => `
      <tr>
        <th scope="row">${p.id}</th>
        <td>${p.name}</td>
        <td>${p.purchase_price}</td>
        <td>${p.sale_price}</td>
      </tr>
  `).join('')
}

// Events
window.addEventListener('load', async () => {
  showProducts()
})

