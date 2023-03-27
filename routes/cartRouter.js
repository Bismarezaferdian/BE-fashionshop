const express = require("express");
const cartController = require("../controller/cartController");
const router = express.Router();

router.get("/:userId", cartController.getAllcart);
router.get("/:id", cartController.getCart);
router.post("/deleteProductCart/:userId", cartController.deleteProductCart);
router.post("/:id", cartController.updateProductChart);
router.delete("/:id", cartController.deleteCart);
// router.put("/:idChart", cartController.updateCart);
// router.post("/", cartController.addCart);

module.exports = router;
