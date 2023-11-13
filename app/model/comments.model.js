const { default: mongoose } = require("mongoose");

const commentSchema = new mongoose.Schema({
    text: {type: String},
    user: {type: mongoose.Types.ObjectId, ref: "user"},
    reply: {type: mongoose.Types.ObjectId, default: "", ref: "user"},
});

module.exports ={
    commentSchema
}