config = require("config");
const data = config.get("subscribersData");

module.exports.findById = function (id) {
	const map = new Map(Object.entries(data));
	let value = [...map.get(id.toString()).value];
	value.push({ id: id });
	return value;
};
