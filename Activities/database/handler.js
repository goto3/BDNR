const db = require("../start/db");

module.exports.saveActivity = async (data) => {
	const _db = await db.getDb();
	const result = await _db.collection("activities").insertOne(data);
	return result.ops[0];
};

module.exports.saveGpsData = async (data) => {
	const _db = await db.getDb();
	const result = await _db.collection("gpsdata").insertOne(data);
	return result.ops[0];
};
