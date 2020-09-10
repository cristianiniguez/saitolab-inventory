const moment = require('moment')

const Product = require('../../models/product.model.js')
const Transaction = require('../../models/transaction.model.js')

// Elements
const inp_startDate = document.getElementById('start-date')
const inp_endDate = document.getElementById('end-date')

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
