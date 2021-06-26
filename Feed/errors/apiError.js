class ApiError extends Error {
	StatusCode = 500;

	body() {
		return {
			ErrorType: `Server error`,
			Message: this.message,
		};
	}
}

module.exports = ApiError;
