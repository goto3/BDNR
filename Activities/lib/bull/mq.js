const config = require("config");
const Queue = require("bull");

var redisConnection = {...config.get("redisConnection")}

var _requestCreatedQueue;
var _requestCanceledQueue;
var _vaccinationFulfilledQueue;
var _notificationsQueue;

(async () => {
	_requestCreatedQueue = new Queue("requestCreated", redisConnection);
	_requestCanceledQueue = new Queue("requestCanceled", redisConnection);
	_vaccinationFulfilledQueue = new Queue("vaccinationFulfilled", redisConnection);
	_notificationsQueue = new Queue("notificationsQueue", redisConnection);
})();

module.exports.pubRequestCreated = (data) => {
	_requestCreatedQueue.add(data);
};

module.exports.pubRequestCanceled = (data) => {
	_requestCanceledQueue.add(data);
};

module.exports.pubVaccinationFulfilled = (data) => {
	_vaccinationFulfilledQueue.add(data);
};

module.exports.pubNotification = (data) => {
	_notificationsQueue.add(data);
};
