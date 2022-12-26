// const { Router } = require("express");
const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const { verifyAuthorization } = require("./verifyToken");

router.get("/", productController.getAllProduct);
router.post("/", productController.addProduct);
router.get("/find/:id", productController.getProduct);
router.put("/:idProduct", productController.updatedProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
