const config = require("config");
const Joi = require("Joi").extend(require("@joi/date"));
Joi.objectId = require("joi-objectid")(Joi);
const _ = require("lodash");
const moment = require("moment");

const validDateFormats = config.get("validDateFormats");
const database = require("../database/handler");
const { processGpsData } = require("../logic/processGpsData");

const JoiValidationError = require("../errors/joiValidationError");
const NotFoundError = require("../errors/notFoundError");

var validatorObject = {
	activityId: Joi.objectId().strict().required(),
	timestamp: Joi.date().format(validDateFormats).required(),
	distance: Joi.number().strict().min(1).required(),
	avgSpeed: Joi.string().min(1).required(),
	longitude: Joi.number().strict().min(-180).max(180).required(),
	latitude: Joi.number().strict().min(-90).max(90).required(),
	sensorData: Joi.object({
		averageCadency: Joi.number().min(0).strict().required(),
		totalCalories: Joi.number().min(0).strict().required(),
	}),
};

module.exports.create = async (data) => {
	validate(data);

	//Validate activity exists
	const activity = await database.findActiveActivity(data.activityId);
	if (!activity) throw new NotFoundError("active activity", data.activityId);

	// Update activity data (distance, calories, avgSpeed, elapsedTime, etc)
	processGpsData(activity, data);

	data.timestamp = moment(data.timestamp, validDateFormats).toDate();
	const gpsData = _.pick(data, Object.keys(validatorObject));
	const result = await database.saveGpsData(gpsData);

	return result;
};

function validate(data) {
	const { error } = Joi.object(validatorObject).validate(data);
	if (error) throw new JoiValidationError(error);
}
