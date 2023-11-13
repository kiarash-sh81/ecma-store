const { productController } = require('../http/products/product.controller');

const router = require('express').Router();

router.post("/create", productController.createProduct);

module.exports ={
    productRoutes: router
}