const config = require("config");
const Joi = require("Joi").extend(require("@joi/date"));
Joi.objectId = require("joi-objectid")(Joi);
const _ = require("lodash");
const moment = require("moment");

const validDateFormats = config.get("validDateFormats");
const database = require("../database/handler");

const JoiValidationError = require("../errors/joiValidationError");

var validatorObject = {
	activityId: Joi.objectId().strict().required(),
	longitude: Joi.number().strict().required(),
	latitude: Joi.number().strict().required(),
	timestamp: Joi.date().format(validDateFormats).required(),
	sensorData: Joi.object({
		cadency: Joi.number().strict().required(),
		calories: Joi.number().min(0).strict().required(),
	}),
};

module.exports.create = async (data) => {
	validate(data);
	data.timestamp = moment(data.timestamp, validDateFormats).toDate();
	const gpsData = _.pick(data, Object.keys(validatorObject));
	const result = await database.saveGpsData(gpsData);
	return result;
};

function validate(data) {
	const { error } = Joi.object(validatorObject).validate(data);
	if (error) throw new JoiValidationError(error);
}
