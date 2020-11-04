const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    
    task:{
        type: String,
        required: true,
        trim: true
    },
    empId:{
        type: mongoose.Types.ObjectId,
        required: true
    },
    note:{
        type: String,
        trim: true,
        default: ""
    },
    progress:{
        type: Number,
        default: 0
    },
    deadline:{
        type:Number,
        default: 0
    },
    timestamp: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("tasks", TaskSchema);