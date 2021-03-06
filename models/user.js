const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    email: {
        type: String,
        trim: true,
        required: true,
        index:{unique: true}
    },

    hashed_password: {
        type: String,
        required: true
    },
    salt: String,
    avatar:{
        type:String,
        default:''
    },
    role: {
        type: Number,
        default: 0
    } 
}, {
    timestamps: true
});

userSchema
    .virtual("password")
    .set(function (password) {
        this._password = password;
        this.salt = uuidv1();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    });

userSchema.methods = {
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    encryptPassword: function (password) {
        if (!password) return "";
        try {
            return crypto
                .createHmac("sha1", this.salt)
                .update(password)
                .digest("hex");
        } catch (err) {
            return "";
        }
    },
    toJson:function(){
        let user = this;
        let userObject = user.toObject();
        
        delete userObject.hashed_password;
        delete userObject.salt;

        return userObject;
    }
};

module.exports = mongoose.model("User", userSchema);