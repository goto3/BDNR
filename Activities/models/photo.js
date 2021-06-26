const config = require("config");
const Joi = require("Joi").extend(require("@joi/date"));
Joi.objectId = require("joi-objectid")(Joi);
const _ = require("lodash");

const validDateFormats = config.get("validDateFormats");
const database = require("../database/handler");

const JoiValidationError = require("../errors/joiValidationError");

const objectValidator = {
	type: Joi.string().required(),
	userId: Joi.objectId().strict().required(),
	date: Joi.date().format(validDateFormats).required(),
	title: Joi.string().min(1).max(100).required(),
	additionalData: {
		url: Joi.string().min(1).required(),
		comment: Joi.string().min(1).required(),
	},
};

async function create(data) {
	validate(data);
	const activity = _.pick(data, Object.keys(objectValidator));
	const result = await database.saveActivity(activity);
	return result;
}

function validate(data) {
	const { error } = Joi.object(objectValidator).validate(data);
	if (error) throw new JoiValidationError(error);
}

module.exports.create = create;
