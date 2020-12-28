const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32
    },
    description: {
        type: String,
        required: true,
        unique: true
    },
    products: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
});



module.exports = mongoose.model("Ticket", userSchema);