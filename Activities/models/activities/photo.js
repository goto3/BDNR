const Joi = require("Joi");

validator = {
	url: Joi.string().min(1).required(),
	comment: Joi.string().min(1).required(),
};

module.exports = validator;
