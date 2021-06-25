const express = require("express");
const config = require("config");
const app = express();

require("./start/routes")(app);
require("./start/db")();
require("./lib/bull/mq");

const port = process.env.PORT || config.get("port");
const server = app.listen(port, () => console.log(`Express: Listening on port ${port}...`));

(async () => {
	const env = process.env.NODE_ENV || "development";
	console.log("Proccess running on...", env);
})();

module.exports = server;
