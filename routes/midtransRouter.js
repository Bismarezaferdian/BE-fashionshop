const express = require("express");
const router = express.Router();
const MidtransController = require("../controller/Midtrans");

router.post("/", MidtransController.transaction);
router.get("/:idMidtrans", MidtransController.cekStatus);

module.exports = router;
