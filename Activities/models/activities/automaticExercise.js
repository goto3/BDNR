const Joi = require("Joi");

validator = {
	type: Joi.string().min(1).required(),
	elapsedTimeSeconds: Joi.number().strict().min(0).required(),
	distance: Joi.number().strict().min(1).required(),
	inProgress: Joi.bool().strict().required(),
	avgSpeed: Joi.string().min(1).required(),
	sensorData: Joi.object({
		totalCalories: Joi.number().strict().min(0).required(),
		averageCadency: Joi.number().strict().min(0).required(),
	}),
};

module.exports = validator;
