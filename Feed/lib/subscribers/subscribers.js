config = require("config");
const data = config.get("subscribersData");

module.exports.findById = function (id) {
	const map = new Map(Object.entries(data));
	return map.get(id.toString()).value;
};
