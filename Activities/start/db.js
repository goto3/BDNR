const MongoClient = require("mongodb").MongoClient;
const config = require("config");

const dbURL = config.get("dbURL");
const dbName = config.get("db");

var _db;

const connectDatabase = async () => {
	const options = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	};
	try {
		const client = new MongoClient(dbURL, options);
		_db = (await client.connect()).db(dbName);
		await createCollections();
		return _db;
	} catch (err) {
		console.log("Error connecting to mongodb database.", err);
	}
	console.log(`MongoDb: Connected to ${dbURL}.`);
};

async function createCollections() {
	try {
		(await _db.createCollection("activities")).createIndex({ userId: 1 });
		(await _db.createCollection("gpsdata")).createIndex({ activityId: 1 });
	} catch (err) {}
}

module.exports.getDb = async () => _db ?? (await connectDatabase());
