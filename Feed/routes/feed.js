const express = require("express");
const router = express.Router();
const db = require("../start/db");

router.get("/:id", async (req, res) => {
	db.client.get(req.params.id, function (error, reply) {
		reply = reply || "{}";
		res.json(JSON.parse(reply));
	});
});

module.exports = router;
