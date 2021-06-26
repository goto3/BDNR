const config = require("config");
const Queue = require("bull");

var redisConnection = {...config.get("redisConnection")}

var _activityCreatedQueue;

(async () => {
	_activityCreatedQueue = new Queue("activityCreated", redisConnection);
})();