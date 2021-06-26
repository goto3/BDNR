const express = require("express");
const router = express.Router();
const timeout = require("../middleware/timeout");

const GpsData = require("../models/gpsData");

router.post("/", [timeout], async (req, res) => {
	const result = await GpsData.create(req.body);
	res.json(result);
});

module.exports = router;
