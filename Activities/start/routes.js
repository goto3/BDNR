const express = require("express");
const activities = require("../routes/activities");
const gpsData = require("../routes/gpsData");
const error = require("../middleware/error");

module.exports = function (app) {
	app.use(express.json());
	app.use("/api/activities", activities);
	app.use("/api/gpsData", gpsData);

	app.use(error); // Must be the last line
};
