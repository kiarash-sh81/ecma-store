const Joi = require('joi');

const productSchema = Joi.object({
    name: Joi.string().min(5).max(20),
    description: Joi.string().min(7).max(100),
    count: Joi.number().min(1),
    price: Joi.string().min(1).max(20),
})

module.exports ={
    productSchema
}