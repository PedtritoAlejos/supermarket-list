const mongoose = require("mongoose");
const {
    ObjectId
} = mongoose.Schema;


const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 50,
        unique: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 100,

    },
    quantity: {
        type: Number,
        required: true

    },
    format: {
        type: String,
        default: "KG",
        enum: ["KG", "LT", "GR", "ML"]
    },
    unit: {
        type: Number,
        required: true
    },
    category: {
        type: ObjectId,
        ref: "Category",
        required: true
    }


}, {
    timestamps: true
});

module.exports = mongoose.model("Product", categorySchema);