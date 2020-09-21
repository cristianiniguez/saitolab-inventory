class Transaction {
  constructor(idProduct, quantity, type, date, id = '') {
    this.id = id
    this.idProduct = idProduct
    this.quantity = quantity
    this.type = type
    this.date = date
  }
}

module.exports = Transaction