const Product = require("../models/Product.js")

const getProducts = async ( req, resp )=>{
    const products = await Product.find();
    resp.json( {
        success: true,
        data: products,
    } );
};

const createProduct = async ( req, resp )=>{
    try {
        const user = {
            title: req.body.title,
            description: req.body.description,
            productBannerImage: req.body.productBannerImage,
            price: req.body.price,
            user: req.user,
        }
        const product = await Product.create( req.body );
        resp.json({
            success: true,
            data: product.getDisplayProductDetails(),
        });
    } catch (error) {
        const formattedErrors = Object.values(error.errors).map((err) => ({
            field: err.path,
            message: err.message,
            value: err.value,
        }));
        resp.status(400).json({
            success: false,
            errorType: 'ValidationError',
            message: 'Invalid input data',
            errors: formattedErrors,
        });
    }
};

const updateProduct = ( req, resp ) => {
    console.log( req.body, req.params.productId );
    resp.send("Acknowledged Put Products request");
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} resp
 */
const deleteProduct = async ( req, resp ) => {
    const deletedProduct = await Product.findByIdAndDelete( req.params.productId );
    if( deletedProduct ){
        resp.send({
            success: true,
            data: deletedProduct,
        });
    } else {
        resp.status(400).json({
            success: false,
            message: "Product does not exists",
        });
    }
};

module.exports = { getProducts, createProduct, updateProduct, deleteProduct };
