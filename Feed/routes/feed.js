const express = require("express");
const router = express.Router();
const db = require("../start/db");

router.get("/:id", async (req, res) => {
	db.client.get(`feed:${req.params.id.toString()}`, function (error, reply) {
		reply = reply || "{}";
		res.json(JSON.parse(reply));
	});
});

module.exports = router;
