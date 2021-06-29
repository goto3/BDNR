const express = require("express");
const feed = require("../routes/feed");
const error = require("../middleware/error");

module.exports = function (app) {
	app.use(express.json());
	app.use("/api/feed", feed);

	app.use(error); // Must be the last line
};
