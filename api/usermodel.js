const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 2,
        trim: true,
    },
    password:{
        type: String,
        required: true,
        minlength: 4
    },
    role:{
        type: String,
        default: "user",
        enum: ["user", "manager"]
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("users", userSchema);