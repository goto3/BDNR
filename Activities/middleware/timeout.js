const TimeoutError = require("../errors/timeoutError");

module.exports = function (req, res, next) {
	res.setTimeout(1000, () => next(new TimeoutError(req)));
	next();
};
