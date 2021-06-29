const ApiError = require("./apiError");

class TimeoutError extends ApiError {
	StatusCode = 408;

	constructor(req) {
		super();
		this.req = req;
	}

	body() {
		return {
			ErrorType: `Timeout error`,
			Message: `Could not process request in time, try again later.`,
		};
	}
}

module.exports = TimeoutError;
