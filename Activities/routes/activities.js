const express = require("express");
const router = express.Router();
const timeout = require("../middleware/timeout");

const database = require("../database/handler");
const AbstractActivity = require("../models/abstractActivity");

router.post("/", [timeout], async (req, res) => {
	const result = await AbstractActivity.create(req.body);
	res.json(result);
});

router.get("/:userId?", [timeout], async (req, res) => {
	let result = [];
	if (req.query.userId) result = await database.findAllActivitiesbyUser(req.query.userId);
	else result = await database.findAllActivities();
	res.json(result);
});

module.exports = router;
