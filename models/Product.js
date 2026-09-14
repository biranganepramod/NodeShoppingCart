const mongoose = require("mongoose");
const { formatDateTime } = require("../utils/utils");

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [ true, "Product title is required." ],
            trim: true,
        },
        description: {
            type: String,
            required: [ true, "Product description is required." ],
            trim: true,
        },
        productBannerImage: {
            type: String,
        },
        price: {
            type: Number,
            cast: "Price must be a valid number.",
            required: [ true, "Product price is required." ],
            min: [0, "Price cannot be negative"],
            trim: true,
        },
        user: {
            type:  mongoose.Schema.Types.ObjectId,
            required: [ true, "user is required" ],
        }
    },
    {
        timestamps: true,
    }
);

productSchema.methods.getDisplayProductDetails = function(){
    return {
        _id: this._id,
        title: this.title,
        description: this.description,
        productBannerImage: this.productBannerImage,
        price: this.price,
        user: this.user,
        createdAt: formatDateTime( this.createdAt ),
        updatedAt: formatDateTime( this.updatedAt ),
    };
}

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
