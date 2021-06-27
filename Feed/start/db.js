const redis = require("redis");
const config = require("config");

var redisConnection = { ...config.get("redisConnection") };
var client;

(() => {
	client = redis.createClient(redisConnection.redis.port, redisConnection.redis.host);
})();

module.exports.client = client;
