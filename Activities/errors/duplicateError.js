const ApiError = require("./apiError");

class DuplicateError extends ApiError {
	StatusCode = 400;

	constructor(resource, id) {
		super();
		this.resource = resource;
		this.id = id;
	}

	body() {
		return {
			ErrorType: `Duplicate error`,
			Message: `Already exists a ${this.resource} for '${this.id}'.`,
		};
	}
}

module.exports = DuplicateError;
