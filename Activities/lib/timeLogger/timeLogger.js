const moment = require("moment");

const msgs = new Map();

function log(msg, action) {
	if (action == "start") {
		msgs.set(msg, moment());
	} else if (action == "end") {
		let elapsed = moment().diff(msgs.get(msg));
		console.log(`${msg} lasted for ${elapsed}ms`);
	}
}

module.exports.log = log;
