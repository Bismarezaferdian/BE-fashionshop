const express = require("express");
const router = express.Router();
const orderController = require("../controller/orderController");

router.get("/income", orderController.getIncome);
router.get("/", orderController.getAllOrder);
router.get("/:idUser", orderController.getOrder);
router.put("/update/:id", orderController.updateOrder);
router.delete("/delete/:id", orderController.deleteOrder);
router.post("/", orderController.addOrder);

module.exports = router;
