const db = require("../start/db");

module.exports.saveActivity = async (activity) => {
	const _db = await db.getDb();
	const result = await _db.collection("activities").insertOne(activity);
	return result.ops[0];
};
