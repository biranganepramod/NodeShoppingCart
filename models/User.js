const { formatDateTime } = require("../utils/utils");
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        "firstName" : {
            type: String,
            required : [ true, "First Name is required" ],
            trim: true,
        },
        "lastName" : {
            type: String,
            required : [ true, "Last Name is required" ],
            trim: true,
        },
        "email" : {
            type: String,
            required : [ true, "Email is required" ],
            lowercase: true,
            unique: true,
            trim: true,
            match: [
            /^\S+@\S+\.\S+$/, 
            'Please enter a valid email address'
            ]
        },
        "username" : {
            type: String,
            required : [ true, "Username is required" ],
            lowercase: true,
            unique: true,
            trim: true,
            match: [
                /^[a-zA-Z0-9]+$/,
                'Username must contain only letters and numbers'
            ]
        },
        "password" : {
            type: String,
            required : [ true, "Password is required" ],
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);
userSchema.methods.getDisplayUserDetails = function(){
    return {
        _id: this._id,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        username: this.username,
        createdAt: formatDateTime( this.createdAt ),
        updatedAt: formatDateTime( this.updatedAt ),
    };
};

const User = mongoose.model("User", userSchema);
module.exports = User;