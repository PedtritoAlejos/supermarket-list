const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    description: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },

    created: {
        type: Date,
        default: new Date()
    },

    products: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
});



module.exports = mongoose.model("Ticket", userSchema);