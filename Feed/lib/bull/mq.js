const config = require("config");
const Queue = require("bull");
const controller = require("../../controller/activitiesController");

var redisConnection = { ...config.get("redisConnection") };

var _activityCreatedQueue;

(async () => {
	_activityCreatedQueue = new Queue("activityCreated", redisConnection);
	_activityCreatedQueue.process(async (job) => {
		controller.handleActivityCreated(job.data);
	});
})();
