const TimeoutError = require("../errors/timeoutError");

module.exports = function (req, res, next) {
	res.setTimeout(10000, () => next(new TimeoutError(req)));
	next();
};
