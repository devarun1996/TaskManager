const mongoose = require("mongoose");

const EmpSchema = new mongoose.Schema({
    
    name:{
        type: String,
        required: true,
        trim: true
    }
})

module.exports = mongoose.model("employees", EmpSchema);