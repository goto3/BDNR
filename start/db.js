const MongoClient = require("mongodb").MongoClient;
const config = require("config");

const dbURL = config.get("dbURL");
const db = config.get("db");

var _db;

module.exports = function () {
	const options = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	};
	MongoClient.connect(dbURL, options, function (err, client) {
		if (err) throw err;
		console.log(`MongoDb: Connected to ${dbURL}.`);
		_db = client.db(db);
	});
};

module.exports.getDb = () => _db;
