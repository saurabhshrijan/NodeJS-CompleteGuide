const fs = require('fs');
const path = require('path');

const Cart = require('./cart');

const db = require('../util/database');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);


module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute(
      'INSERT INTO products (id, title, description, price,imageUrl) VALUES (?, ?, ?, ?, ?) ',
      [this.id,this.title,this.description,this.price,this.imageUrl]
      );
  }

  static deleteById(id) {
    return db.execute('DELETE FROM products WHERE id=?',[id]);
  }

  static fetchAll() {
  return db.execute('SELECT * FROM PRODUCTS ');
  }

  static findById(id) {
    return db.execute('SELECT * FROM products WHERE products.id=?',[id]);
  }
};
