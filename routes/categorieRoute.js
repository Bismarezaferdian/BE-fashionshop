const express = require("express");
const categoriesController = require("../controller/categoriesController");
const router = express.Router();

router.get("/", categoriesController.getAllCategorie);
router.get("/:id", categoriesController.searchCategories);
router.delete("/delete/:id", categoriesController.deleteCategorie);
router.put("/update/:id", categoriesController.updateCategories);
router.post("/", categoriesController.addCategories);

module.exports = router;
