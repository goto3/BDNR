const config = require("config");
const Joi = require("joi").extend(require("@joi/date"));
Joi.objectId = require("joi-objectid")(Joi);
const _ = require("lodash");
const moment = require("moment");
const mq = require("../lib/bull/mq");

const validDateFormats = config.get("validDateFormats");
const database = require("../database/handler");

const JoiValidationError = require("../errors/joiValidationError");
const DeferBindingError = require("../errors/deferBindingError");

var validatorObject = {
	type: Joi.string().required(),
	userId: Joi.number().strict().required(),
	date: Joi.date().format(validDateFormats).required(),
	title: Joi.string().min(1).max(100).required(),
};

module.exports.create = async (data) => {
	setValidatorObject(data.type);
	validate(data);
	data.date = moment(data.date, validDateFormats).toDate();
	const activity = _.pick(data, Object.keys(validatorObject));
	const result = await database.saveActivity(activity);
	mq.pubActivityCreated(result);
	return result;
};

function validate(data) {
	const { error } = Joi.object(validatorObject).validate(data);
	if (error) throw new JoiValidationError(error);
}

function setValidatorObject(type) {
	try {
		if (type == "abstractActivity") throw new DeferBindingError(`Activity.type cannot be 'abstractActivity'`);
		const typeValidator = require(`./activities/${type}`);
		validatorObject = { ...validatorObject, additionalData: { ...typeValidator } };
	} catch (err) {
		throw new DeferBindingError(`'${type}' is not a valid 'Activity.type'.`);
	}
}
