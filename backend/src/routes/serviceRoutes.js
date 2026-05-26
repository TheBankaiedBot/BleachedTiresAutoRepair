const express = require("express");
const { getServices, createService } = require("../controllers/serviceController");

const router = express.Router();

router.get("/", getServices);
router.post("/", createService); // optional

module.exports = router;
