const db = require("../start/db");
const subscribersLib = require("../lib/subscribers/subscribers");

module.exports.handleActivityCreated = async function handleActivityCreated(message) {
	const subscribers = subscribersLib.findById(message.userId);
	console.log(subscribers);
	for (subscriber of subscribers) {
		db.client.get(subscriber.id, function (err, reply) {
			if (err) throw err;
			if (!reply) {
				db.client.set(subscriber.id.toString(), JSON.stringify([message]));
			} else {
				reply = JSON.parse(reply);
				let i = 0;
				while (reply[i].date > message.date) {
					i++; //insertPosition
				}
				reply.splice(i, 0, message);
				db.client.set(subscriber.id, JSON.stringify(reply));
			}
		});
	}

	db.client.get(message.userId, function (err, reply) {
		if (err) throw err;
		if (!reply) {
			db.client.set(message.userId.toString(), JSON.stringify([message]));
		} else {
			reply = JSON.parse(reply);
			let j = 0;
			while (reply[j].date > message.date) {
				j++; //insertPosition
			}
			reply.splice(j, 0, message);
			db.client.set(message.userId, JSON.stringify(reply));
		}
	});
};
