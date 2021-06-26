const ApiError = require("./apiError");

class AuthError extends ApiError {
	StatusCode = 403;

	constructor(req) {
		super();
		this.req = req;
	}

	body() {
		return {
			ErrorType: `Auth error`,
			Message: `Could not validate auth token, set a valid 'Authentication' token as a header.`,
		};
	}
}

module.exports = AuthError;
