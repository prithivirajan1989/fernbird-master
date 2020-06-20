const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const productControl = require("../controllers/products");

// create products
router.post("", checkAuth, productControl.addProducts);

// get products by creator
router.get("", checkAuth, productControl.getProductsByCreator);

// get product by id

router.get("/:id", checkAuth, productControl.getProductsById);

// update product
router.put("/edit/:id", checkAuth, productControl.UpdateProduct);

// delete product
router.delete("/:id", checkAuth, productControl.deleteProduct);

module.exports = router;