const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        name:{
            type: String,
            trim:true,
            required:true,
            maxlength:50,
            unique:true
        },
        description:{
            type: String,
            required:true,
            maxlength:100,
            
        },
        icon:{
            data:Buffer,
            contentType:String

        }

    },
    { timestamps:true}
);

module.exports = mongoose.model("Category",categorySchema);