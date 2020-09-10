class Product {
  constructor(name, purchasePrice, salePrice, id = '') {
    this.id = id
    this.name = name
    this.purchasePrice = purchasePrice
    this.salePrice = salePrice
  }
}

module.exports = Product