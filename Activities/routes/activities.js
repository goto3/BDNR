const express = require("express");
const router = express.Router();
const timeout = require("../middleware/timeout");

router.post("/", [timeout], async (req, res) => {});

module.exports = router;
