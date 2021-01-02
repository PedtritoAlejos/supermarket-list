const mongoose = require("mongoose");
const {
    ObjectId
} = mongoose.Schema;

const ticketSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        unique:true
    },
    description: {
        type: String,
        maxlength: 60,
        required: true
    },
    products: {
        type: Array,
        default: []
    },
    user: {
        type: ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
});



module.exports = mongoose.model("Ticket", ticketSchema);