const db = require("../start/db");
const subscribersLib = require("../lib/subscribers/subscribers");

module.exports.handleActivityCreated = async function handleActivityCreated(message) {
	let subscribers = subscribersLib.findById(message.userId);

	const batch = db.client.batch();
	for (subscriber of subscribers) {
		batch.get(`feed:${subscriber.id}`);
	}

	batch.exec((err, replies) => {
		replies.forEach((r, it) => {
			if (err) throw err;
			if (!r) {
				db.client.set(`feed:${subscribers[it].id.toString()}`, JSON.stringify([message]));
			} else {
				r = JSON.parse(r);
				let i = 0;
				while (r[i].date > message.date) {
					i++; //insertPosition
				}
				r.splice(i, 0, message);
				db.client.set(`feed:${subscribers[it].id.toString()}`, JSON.stringify(r));
			}
		});
	});
};
