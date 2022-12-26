const { Router } = require("express");
const express = require("express");
const router = express.Router();
const userController = require("../controller/usercontroller");
const { verifyAuthorization } = require("./verifyToken");

router.get("/", verifyAuthorization, userController.getAllUser);
router.get("/stats", userController.getUserStats);
router.get("/:id", userController.getUser);
router.put("/:id", verifyAuthorization, userController.updateUser);
router.delete("/:id", verifyAuthorization, userController.deleteUser);

module.exports = router;
