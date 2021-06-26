const MongoClient = require("mongodb").MongoClient;
const config = require("config");

const dbURL = config.get("dbURL");
const dbName = config.get("db");

var _db;

const getDb = async () => {
	if (!_db) await connectDatabase();
	return _db;
};

const connectDatabase = async () => {
	const options = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	};
	try {
		const client = new MongoClient(dbURL, options);
		_db = (await client.connect()).db(dbName);
		console.log(`MongoDb: Connected to ${dbURL}.`);
	} catch (err) {
		console.log("Error connecting to mongodb database.", err);
	}
};

module.exports.getDb = getDb;
