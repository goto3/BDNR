const Joi = require("joi");

validator = {
	type: Joi.string().min(1).required(),
	elapsedTimeSeconds: Joi.number().strict().min(0).required(),
	distance: Joi.number().strict().min(1).required(),
	photoUrl: Joi.string().min(1).required(),
	description: Joi.string().min(1).required(),
	effort: Joi.number().strict().min(1).max(10).required(),
};

module.exports = validator;
