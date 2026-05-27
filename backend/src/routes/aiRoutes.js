const express = require("express");
const router = express.Router();
const { recommendService } = require("../controllers/aiController");

router.post("/recommend", recommendService);

module.exports = router;
