const { default: mongoose } = require("mongoose");

const commentSchema = new mongoose.Schema({
    text: {type: String},
    user: {type: String},
    repile: {type: mongoose.Types.ObjectId, default: "", ref: "user"},
});

module.exports ={
    commentSchema
}