const mongo = require("mongodb");
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

module.exports.findAllActivities = async () => {
	const _db = await db.getDb();
	return await _db.collection("activities").find().toArray();
};

module.exports.findActivitiesbyUser = async (data) => {
	const _db = await db.getDb();
	return await _db
		.collection("activities")
		.find({ userId: new mongo.ObjectID(data) })
		.toArray();
};

module.exports.findAllGpsData = async (data) => {
	const _db = await db.getDb();
	return await _db
		.collection("gpsdata")
		.find({ activityId: new mongo.ObjectID(data) })
		.toArray();
};

module.exports.findActiveActivity = async (data) => {
	const _db = await db.getDb();
	return await _db.collection("activities").findOne({ _id: new mongo.ObjectID(data), type: "automaticExercise", "additionalData.inProgress": true });
};

module.exports.updateActiveActivity = async (data) => {
	const _db = await db.getDb();
	return await _db.collection("activities").updateOne(
		{ _id: new mongo.ObjectID(data._id) },
		{
			$set: {
				"additionalData.elapsedTimeSeconds": data.additionalData.elapsedTimeSeconds,
				"additionalData.distance": data.additionalData.distance,
				"additionalData.avgSpeed": data.additionalData.avgSpeed,
				"additionalData.sensorData": data.additionalData.sensorData,
			},
		}
	);
};
