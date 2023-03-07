const express = require("express");
const router = express.Router();
const categoriesProductsController = require("../controller/categoriesProductsContoller.");

router.get("/", categoriesProductsController.getAllCategoriesProduct);
router.put("/:id", categoriesProductsController.updateCategoriesProducts);
router.delete("/:id", categoriesProductsController.deleteCategoriesProducts);
router.post("/", categoriesProductsController.addCategoriesProducts);

module.exports = router;
