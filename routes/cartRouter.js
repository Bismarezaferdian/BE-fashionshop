const express = require("express");
const cartController = require("../controller/cartController");
const router = express.Router();

router.get("/", cartController.getAllcart);
router.get("/:id", cartController.getCart);
router.delete("/:id", cartController.deleteCart);
router.put("/:idCart", cartController.updateCart);
router.post("/", cartController.addCart);

module.exports = router;
