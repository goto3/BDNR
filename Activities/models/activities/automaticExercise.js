const Joi = require("Joi");

validator = {
	additionalData: {
		type: Joi.string().min(1).required(),
		elapsedTimeMinutes: Joi.number().strict().min(0).required(),
		distance: Joi.number().strict().min(1).required(),
		inProgress: Joi.bool().strict().required(),
		avgSpeed: Joi.string().min(1).required(),
		sensorData: Joi.object({
			totalCalories: Joi.number().strict().min(0),
			averageCadency: Joi.number().strict().min(0),
		}).required(),
	},
};

module.exports = validator;
