class Transaction {
  constructor(idProduct, quantity, date, id = '') {
    this.id = id
    this.idProduct = idProduct
    this.quantity = quantity
    this.date = date
  }
}

module.exports = Transaction