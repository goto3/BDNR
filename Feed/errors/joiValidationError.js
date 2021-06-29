const ApiError = require("./apiError");

class JoiValidationError extends ApiError {
	StatusCode = 400;

	constructor(error) {
		super();
		this.error = error;
	}

	body() {
		return {
			ErrorType: this.error.details[0].type,
			Message: this.error.details[0].message,
		};
	}
}

module.exports = JoiValidationError;
