const ApiError = require("./apiError");

class DeferBindingError extends ApiError {
	StatusCode = 500;

	constructor(msg) {
		super();
		this.msg = msg;
	}

	body() {
		return {
			ErrorType: `Defer binding error`,
			Message: this.msg,
		};
	}
}

module.exports = DeferBindingError;
