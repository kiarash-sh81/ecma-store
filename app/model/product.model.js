const { default: mongoose,  } = require("mongoose");
const { commentSchema } = require("./comments.model");

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    count: {type: Number, required: true},
    price: {type: String, required: true},
    color: {type: [String], default: []},
    brand: {type: String, default: ""},
    comment: {type: [commentSchema] , default: []},
    likes: {type: [mongoose.Types.ObjectId], default: []}
});

const productModel = mongoose.model("product", productSchema);

module.exports ={
    productModel
}
