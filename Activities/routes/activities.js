const express = require("express");
const router = express.Router();
const timeout = require("../middleware/timeout");

const AbstractActivity = require("../models/abstractActivity");

router.post("/", [timeout], async (req, res) => {
	const result = await AbstractActivity.create(req.body);
	res.json(result);
});

module.exports = router;
