const DeferBindingError = require("../errors/deferBindingError");

async function createActivity(data) {
	try {
		if (data.type == "deferBinding") throw new DeferBindingError(`Activity.type cannot be 'deferBinding'`);
		return require(`./${data.type}`).create(data);
	} catch (err) {
		throw new DeferBindingError(`'${data.type}' is not a valid 'Activity.type'.`);
	}
}

module.exports.createActivity = createActivity;
