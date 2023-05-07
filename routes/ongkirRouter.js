const express = require("express");
const router = express.Router();
const cekOngkirController = require("../controller/cekOngkirController");

router.get("/province", cekOngkirController.getProvince);
router.get("/city/:provId", cekOngkirController.getCity);
router.post("/cost", cekOngkirController.getCost);

module.exports = router;
