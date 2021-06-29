const ApiError = require("./apiError");

class ValidationError extends ApiError {
	StatusCode = 400;

	constructor(error) {
		super();
		this.error = error;
	}

	body() {
		return {
			ErrorType: this.error.type,
			Message: this.error.message,
		};
	}
}

module.exports = ValidationError;
