const Joi = require("Joi");

validator = {
	additionalData: {
		url: Joi.string().min(1).required(),
		comment: Joi.string().min(1).required(),
	},
};

module.exports = validator;
