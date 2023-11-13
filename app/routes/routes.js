const router = require('express').Router();
const {productRoutes} = require('./product.routes');
const { userRoutes } = require('./user.Routes');

router.use("/user",userRoutes);
router.use("/product",productRoutes);

module.exports ={
    router
}