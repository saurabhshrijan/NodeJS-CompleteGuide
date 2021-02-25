const Product = require('../models/product');
const Cart = require('../models/cart');
const getProducts = (req, res, next) => {
  Product.fetchAll().then(([rows,fieldData])=>{
    res.render('shop/product-list', {
      prods: rows,
      pageTitle: 'All Products',
      path: 'const cts'
    });
  }).catch(err=>console.log(err));
};

const getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId).then(([product])=>{
    res.render('shop/product-detail', {
      product: product[0],
      pageTitle: product.title,
      path: '/products'
    });
  })
  .catch(err=>console.log(err))
};

const getIndex = (req, res, next) => {
  Product.fetchAll().then(([rows,fieldData])=>{
    res.render('shop/index', {
      prods: rows,
      pageTitle: 'Shop',
      path: '/'
    });
  })
  .catch(err=>console.log(err));
};

const getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for (let product of products) {
        const cartProductData = cart.products.find(
          prod => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProducts
      });
    });
  });
};

const postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId).then(([rows,fieldData]) => {
    Cart.addProduct(prodId, rows.price);
  })
  .catch(err=>console.log(err));
  res.redirect('/cart');
};

const postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId).then(([rows,fieldData]) => {
    Cart.deleteProduct(prodId, rows.price);
    res.redirect('/cart');
  })
  .catch(err=>console.log(err));
};

const getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

const getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
module.exports={
  getProducts,
  getProduct,
  getIndex,
  getCart,
  postCart,
  postCartDeleteProduct,
  getOrders,
  getCheckout
}