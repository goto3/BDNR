const express = require("express");
const router = express.Router();
const timeout = require("../middleware/timeout");

const database = require("../database/handler");
const GpsData = require("../models/gpsData");

router.post("/", [timeout], async (req, res) => {
	const result = await GpsData.create(req.body);
	res.json(result);
});

router.get("/:activityId?", [timeout], async (req, res) => {
	let result = [];
	if (req.query.activityId) result = await database.findAllGpsDataByActivity(req.query.activityId);
	else result = await database.findAllGpsData();
	res.json(result);
});

module.exports = router;
