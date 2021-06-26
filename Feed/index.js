const express = require("express");
const config = require("config");
require("express-async-errors");
const app = express();

require("./start/routes")(app);

const port = process.env.PORT || config.get("port");
const server = app.listen(port, () => console.log(`Express: Listening on port ${port}...`));

