const config = require("config");
const redis = require("redis");

const mongodb = require("./db");

var _redis;

const getDb = async () => {
	if (!_redis) await connectRedis();
	return _redis;
};

const connectRedis = async () => {
	try {
		_redis = redis.createClient();
		_redis.on("error", function (error) {
			console.error(error);
		});
		console.log(`Redis: Connected to database.`);
		await populateRedis();
	} catch (err) {
		console.log("Error connecting to redis database.", err);
	}
};

async function populateRedis() {
	const _mongodb = await mongodb.getDb();
	const autoActivities = await _mongodb.collection("activities").find({ type: "automaticExercise", "additionalData.inProgress": true }).toArray();

	const batch = _redis.batch();
	autoActivities.forEach((a) => {
		batch.set(`activeActivity_${a._id.toString()}`, JSON.stringify(a));
	});
	batch.exec(function (err, replies) {
		if (err) throw err;
		console.log("Successfully populated redis database.");
	});
}

module.exports.getDb = getDb;
