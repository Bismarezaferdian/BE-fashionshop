const { Router } = require("express");
const express = require("express");
const router = express.Router();
const userController = require("../controller/usercontroller");
const { verifyAuthorization, cekCookie } = require("./verifyToken");

router.get("/", userController.getAllUser);
router.get("/stats", userController.getUserStats);
router.get("/:id", userController.getUser);
router.put("/update/:id", verifyAuthorization, userController.updateUser);
router.delete("/delete/:id", verifyAuthorization, userController.deleteUser);

module.exports = router;
