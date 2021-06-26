const moment = require("moment");
const config = require("config");

const database = require("../database/handler");

const validDateFormats = config.get("validDateFormats");

module.exports.processGpsData = async (activity, gpsData) => {
	const diff = moment(gpsData.timestamp, validDateFormats).toDate() - activity.date.getTime();
	activity.additionalData.elapsedTimeSeconds = diff / 1000;
	activity.additionalData.distance = gpsData.distance;
	activity.additionalData.avgSpeed = gpsData.avgSpeed;
	if (gpsData.sensorData) {
		activity.additionalData.sensorData = {
			totalCalories: gpsData.sensorData.totalCalories,
			averageCadency: gpsData.sensorData.averageCadency,
		};
	}
	database.updateActiveActivity(activity);
};
