const { productModel } = require("../../model/product.model");
const createError = require('http-errors');
const { productSchema } = require("../../validation/product.validation");


class productController {
    async createProduct(req, res, next){
        try {
            const data = await productSchema.validateAsync(req.body);
            const newProduct = await productModel.create(data);
            if(!newProduct) createError.InternalServerError("internal server error");
            res.status(201).json({
                statusCode: 201,
                message: "product create successfully",
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports ={
    productController : new productController()
}

//joi