// const { Router } = require("express");
const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const { upload, uploadMulti } = require("../middleware/multer");
const { verifyAuthorization } = require("./verifyToken");

router.get("/", productController.getAllProduct);
router.post("/", upload.any(), productController.addProduct);
router.post("/upload", upload.any(), productController.upload);
router.get("/find/:id", productController.getProduct);
router.put(
  "/update/:idProduct",
  upload.any(),
  productController.updatedProduct
);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
