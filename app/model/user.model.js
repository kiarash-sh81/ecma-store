const { default: mongoose,  } = require("mongoose");

const userSchema = new mongoose.Schema({
    phone: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    Role: {type: String, default: 'USER'},
    first_name: {type: String, default: ""},
    last_name: {type: String, default: ""},
    basket: {type: [mongoose.Types.ObjectId], default: []},
    likes: {type: [mongoose.Types.ObjectId], default: []},
});

const userModel = mongoose.model("user", userSchema);

module.exports ={
    userModel
}
