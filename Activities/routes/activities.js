const express = require("express");
const router = express.Router();
const timeout = require("../middleware/timeout");

const { createActivity } = require("../models/deferBinding");

router.post("/", [timeout], async (req, res) => {
	const result = await createActivity(req.body);
	res.json(result);
});

module.exports = router;
