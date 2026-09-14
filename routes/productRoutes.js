const { verifyToken } = require("../controllers/authController");
const { getProducts, createProduct, updateProduct, deleteProduct } = require("../controllers/productController.js");
const express = require("express");
const router = express.Router();

router.get("/products", getProducts);
router.post("/products", verifyToken, createProduct);
router.put("/products/:productId", updateProduct);
router.delete("/products/:productId", deleteProduct);

module.exports = router;
