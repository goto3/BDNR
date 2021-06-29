const Joi = require("joi").extend(require("@joi/date"));
Joi.objectId = require("joi-objectid")(Joi);

validator = {
	text: Joi.string().min(1).required(),
};

module.exports = validator;
